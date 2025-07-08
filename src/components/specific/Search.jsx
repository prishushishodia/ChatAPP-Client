import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hooks";
import {
  useLazySerarchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

export default function Search() {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySerarchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 700);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        p={{ xs: "1.5rem", sm: "2rem" }}
        width={{ xs: "90vw", sm: "25rem" }}
        spacing={2}
        sx={{
          bgcolor: "#fdf6f0",
          borderRadius: "1.25rem",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.75rem",
            color: "#7a5c3e",
          }}
        >
          🔍 Find People
        </DialogTitle>

        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          placeholder="Search by username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#a58f7e" }} />
              </InputAdornment>
            ),
            sx: {
              background: "#fff",
              color: "#5c4438",
              borderRadius: "0.5rem",
            },
          }}
          InputLabelProps={{
            sx: { color: "#a58f7e" },
          }}
        />

        <List
          sx={{
            maxHeight: "300px",
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
          {users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
}
