import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useErrors, useAsyncMutation } from "../../hooks/hooks";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);

  const { isError, error, isLoading, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const GroupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [{ isError, error }];
  useErrors(errors);

  const selectMemberHandler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id)
        ? prev.filter((id) => id !== _id)
        : [...prev, _id]
    );
  };

  const SubmitHandler = () => {
    if (!GroupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Select at least 2 members");

    newGroup("Creating new group...", {
      name: GroupName.value,
      members: selectedMembers,
    });

    dispatch(setIsNewGroup(false));
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1.5rem", sm: "2.5rem" }}
        width={{ xs: "90vw", sm: "25rem" }}
        spacing={"1.5rem"}
        sx={{
          bgcolor: "#fef6f0",
          borderRadius: "1.25rem",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#7a5c3e",
            fontSize: "1.75rem",
          }}
        >
          ✨ Create New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={GroupName.value}
          onChange={GroupName.changeHandler}
          InputProps={{
            sx: {
              background: "#fff",
              borderRadius: "0.5rem",
              color: "#5c4438",
            },
          }}
          InputLabelProps={{ sx: { color: "#a58f7e" } }}
        />

        <Typography variant="body1" sx={{ color: "#5c4438", fontWeight: 500 }}>
          Members
        </Typography>

        <Stack
          spacing={1}
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            pr: "4px",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c2b2a3",
              borderRadius: "2px",
            },
          }}
        >
          {isLoading ? (
            <Skeleton height={40} />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-evenly">
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={closeHandler}
            sx={{
              borderRadius: "0.5rem",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={SubmitHandler}
            disabled={isLoadingNewGroup}
            sx={{
              background: "linear-gradient(90deg, #b499c9, #e9d5ff)",
              color: "#4e3a2e",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              textTransform: "none",
              ":hover": {
                background: "linear-gradient(90deg, #9d7fc0, #d3b9f3)",
              },
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
