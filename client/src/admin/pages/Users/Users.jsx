import React, { useEffect, useRef, useState } from "react";

import {
  Table,
  TableHead,
  TableData,
  TableBody,
  TableRow,
} from "admin/adminComponents/CustomTable/CustomTable";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setFirstUserDoc,
  setLastUserDoc,
  setUsers,
  toggleAddUserDialog,
  toggleIsUsersLoading,
} from "redux/admin/users/users.actions";
import {
  selectDeleteUserDialog,
  selectEditUserDialog,
  selectFirstUserDoc,
  selectIsOperationRunning,
  selectIsUsersLoading,
  selectLastUserDoc,
  selectUserForOperation,
  selectUsers,
} from "redux/admin/users/users.selectors";
// components
import UserInfoRow from "./UserInfoRow";
import {
  getNextUsersForAdmin,
  getPrevUsersForAdmin,
  getUsersForAdmin,
  getUsersFromSearchQueryAdmin,
} from "firebase/users.utils";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import PrevAndNextButtons from "admin/adminComponents/PrevAndNextButtons/PrevAndNextButtons";
import DataContainer from "admin/adminComponents/DataContainer/DataContainer";
import InputField from "components/InputField/InputField";
import CustomButton from "components/CustomButton/CustomButton";
import { Fragment } from "react";
import AddUserDialog from "admin/adminComponents/AddUserDialog/AddUserDialog";
import DeleteUserDialog from "admin/adminComponents/DeleteUserDialog/DeleteUserDialog";
import { selectCurrentUserId } from "redux/user/user.selectors";
import EditUserDialog from "admin/adminComponents/EditUserDialog/EditUserDialog";

function Users({
  users,
  isUsersLoading,
  firstUserDoc,
  lastUserDoc,
  setUsers,
  toggleIsUsersLoading,
  setFirstUserDoc,
  setLastUserDoc,
  toggleAddUserDialog,
  isOperationRunning,
  currentUserId,
  userForOperation,
  editUserDialog,
  deleteUserDialog,
}) {
  const searchQueryRef = useRef();
  const [searchUserNotFound, setSearchUserNotFound] = useState(false);

  const setUsersData = (userData) => {
    const { users, firstUserDoc, lastUserDoc } = userData;
    setUsers(users, userData);
    setFirstUserDoc(firstUserDoc);
    setLastUserDoc(lastUserDoc);
  };

  const loadUsers = async () => {
    toggleIsUsersLoading();
    try {
      const usersData = await getUsersForAdmin();
      setUsersData(usersData);
      toggleIsUsersLoading();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!users || Object.keys(users).length === 0) {
      loadUsers();
    }
  }, []);

  const handleNextUsersClick = async () => {
    toggleIsUsersLoading();
    try {
      const usersData = await getNextUsersForAdmin(lastUserDoc);
      const { lastUserDoc: lastDoc, users } = usersData;

      if (!lastDoc && Object.keys(users).length === 0) {
        setLastUserDoc(lastDoc);
      } else {
        setUsersData(usersData);
      }
      toggleIsUsersLoading();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevUsersClick = async () => {
    toggleIsUsersLoading();
    try {
      const usersData = await getPrevUsersForAdmin(firstUserDoc);
      const { firstUserDoc: firstDoc, users } = usersData;
      if (!firstDoc && Object.keys(users).length === 0) {
        setFirstUserDoc(firstDoc);
      } else {
        setUsersData(usersData);
      }
      toggleIsUsersLoading();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    const searchText = searchQueryRef.current.value.toLowerCase();
    toggleIsUsersLoading();
    try {
      const userData = await getUsersFromSearchQueryAdmin(searchText);

      if (Object.keys(userData.users).length === 0) {
        setSearchUserNotFound(true);
      } else {
        setUsersData(userData);
        searchQueryRef.current.value = "";
        setSearchUserNotFound(false);
      }
      toggleIsUsersLoading();
    } catch (error) {
      console.log(error);
    }
  };

  const usersToDisplay = (() => {
    if (users.hasOwnProperty(currentUserId)) {
      delete users[currentUserId];
    }
    return users;
  })();
  return (
    <Fragment>
      <div>
        <h3>Users Info</h3>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "80px",
            gap: "2rem",
          }}
        >
          <CustomButton
            onClick={toggleAddUserDialog}
            size="xs"
            isActive
            color="black"
            disabled={isOperationRunning}
          >
            add user
          </CustomButton>
          <CustomButton
            style={{ marginRight: "auto" }}
            onClick={loadUsers}
            size="xs"
            isActive
            color="black"
            disabled={isOperationRunning}
          >
            all users
          </CustomButton>
          <form
            onSubmit={handleSearchFormSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginRight: "10%",
            }}
          >
            <InputField
              ref={searchQueryRef}
              label="search User"
              type="text"
              required
              error={searchUserNotFound}
              helperText={searchUserNotFound ? "user not found" : ""}
              onChange={() => {
                if (searchUserNotFound) setSearchUserNotFound(false);
              }}
            />
            <CustomButton
              disabled={isOperationRunning}
              color="black"
              size="xs"
              isActive
            >
              search
            </CustomButton>
          </form>
        </div>
        <DataContainer>
          {isUsersLoading && <LoadingSpinner />}
          <Table hasDarkFonts>
            <TableHead>
              <TableRow>
                <TableData>Email</TableData>
                <TableData>role</TableData>
                <TableData>provider</TableData>
                <TableData>Edit</TableData>
                <TableData>delete</TableData>
                <TableData>disable</TableData>
              </TableRow>
            </TableHead>
            {!isUsersLoading && (
              <TableBody>
                {Object.keys(usersToDisplay).length > 0 ? (
                  Object.keys(usersToDisplay).map((userId) => (
                    <UserInfoRow
                      key={userId}
                      userInfo={{ id: userId, ...usersToDisplay[userId] }}
                    />
                  ))
                ) : (
                  <tr
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <td>
                      <h4>users not found</h4>
                    </td>
                  </tr>
                )}
              </TableBody>
            )}
          </Table>
        </DataContainer>
        <PrevAndNextButtons
          handlePrevClick={handlePrevUsersClick}
          handleNextClick={handleNextUsersClick}
          disablePrev={!firstUserDoc}
          disableNext={!lastUserDoc}
        />
      </div>
      <AddUserDialog />
      {deleteUserDialog && userForOperation && <DeleteUserDialog />}
      {editUserDialog && userForOperation && <EditUserDialog />}
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  firstUserDoc: selectFirstUserDoc,
  lastUserDoc: selectLastUserDoc,
  isUsersLoading: selectIsUsersLoading,
  isOperationRunning: selectIsOperationRunning,
  currentUserId: selectCurrentUserId,
  userForOperation: selectUserForOperation,
  editUserDialog: selectEditUserDialog,
  deleteUserDialog: selectDeleteUserDialog,
});

const mapDispatchToProps = (dispatch) => ({
  setUsers: (users) => dispatch(setUsers(users)),
  toggleIsUsersLoading: () => dispatch(toggleIsUsersLoading()),
  setLastUserDoc: (lastUserDoc) => dispatch(setLastUserDoc(lastUserDoc)),
  setFirstUserDoc: (firstUserDoc) => dispatch(setFirstUserDoc(firstUserDoc)),
  toggleAddUserDialog: () => dispatch(toggleAddUserDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
