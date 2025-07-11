import {
  IconButton, Tooltip, Box, Drawer, Stack, Typography,
  TextField, Button, Backdrop, CircularProgress
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Suspense, lazy, memo, useEffect, useState } from 'react';
import { Link } from "../components/styles/StyledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation
} from '../redux/api/api';
import { useAsyncMutation, useErrors } from '../hooks/hooks';
import LayoutLoader from "../components/layout/Loaders";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

function Group() {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });
  const [updateName, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteChat, isLoadingDeleteChat] = useAsyncMutation(useDeleteChatMutation);

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ];
  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const NavigateBack = () => navigate("/");
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    updateName("Updating group name...", { chatId, name: groupNameUpdatedValue });
    setIsEdit(false);
  };

  const openConfirmDeleteHandler = () => setConfirmDeleteDialog(true);
  const closeConfirmDeleteHandler = () => setConfirmDeleteDialog(false);
  const openAddMemberHandler = () => dispatch(setIsAddMember(true));
  const deleteHandler = () => {
    deleteChat("Deleting group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/group");
  };
  const removeMemberHandler = (userId) => {
    removeMember("Removing member...", { chatId, userId });
  };

  const IconButtons = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon sx={{ color: "#8696A0" }} />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "#202C33",
            color: "#E9EDEF",
            ":hover": { bgcolor: "#2A3942" },
          }}
          onClick={NavigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing="1rem" padding="3rem">
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            label="Group Name"
            variant="outlined"
            sx={{
              input: { color: "#E9EDEF" },
              label: { color: "#8696A0" },
              fieldset: { borderColor: "#2A3942" }
            }}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon sx={{ color: "#00A884" }} />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "#E9EDEF",
              fontWeight: "bold",
            }}
          >
            {groupName}
          </Typography>
          <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
            <EditIcon sx={{ color: "#8696A0" }} />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing="1rem"
      p={{ xs: "0", sm: "1rem", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
        sx={{ bgcolor: "#c62828", color: "#fff", ":hover": { bgcolor: "#b71c1c" } }}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
        sx={{
          background: "#00A884",
          color: "#fff",
          fontWeight: "bold",
          ":hover": {
            background: "#019875",
          },
        }}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid2
      container
      height="100vh"
      sx={{
        background: "#111B21",
        color: "#E9EDEF",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Grid2
        sx={{
          display: { xs: "none", sm: "block" },
          width: "60vw",
          background: "#202C33",
          borderRight: "1px solid #2A3942",
        }}
        size={{ sm: 4 }}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid2>

      <Grid2
        size={{ sm: 8, md: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconButtons}
        {groupName && (
          <>
            {GroupName}
            <Typography margin="2rem" alignSelf="flex-start" variant="body1" color="#8696A0">
              Members
            </Typography>
            <Stack
              maxWidth="45rem"
              width="100%"
              boxSizing="border-box"
              padding={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
              spacing="2rem"
              height="50vh"
              overflow="auto"
            >
              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                      bgcolor: "#202C33",
                      color: "#E9EDEF",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid2>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer sx={{ display: { xs: "block", sm: "none" } }} open={isMobileMenuOpen} onClose={handleMobileClose}>
        <GroupList w="35vh" myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid2>
  );
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      background: "#1E2A30",
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign="center" padding="1rem" color="#8696A0">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        direction="row"
        spacing="1rem"
        alignItems="center"
        sx={{
          padding: "1rem",
          ":hover": { bgcolor: "#2A3942" },
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography color="#E9EDEF" fontWeight="500">
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Group;
