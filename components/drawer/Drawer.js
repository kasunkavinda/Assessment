import { useRef } from "react";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Drawer = () => {
  const titleInputref = useRef();
  const categotyInputref = useRef();
  const descriptionInputref = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputref.current.value;
    const enteredCategory = categotyInputref.current.value;
    const enteredDescription = descriptionInputref.current.value;
    console.log(enteredTitle);
    const cardData = {
      title: enteredTitle,
      category: enteredCategory,
      description: enteredDescription,
    };

    async function addCardDataHandler(cardData) {
      const response = await fetch("/api/new-card", {
        method: "POST",
        body: JSON.stringify(cardData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    }
    addCardDataHandler(cardData);
  }
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <h2>New Classified</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextareaAutosize
          id="title"
          name="title"
          label="Title"
          variant="filled"
          inputRef={titleInputref}
        />
        <TextareaAutosize
          id="filled-multiline-flexible"
          label="Multiline"
          name="category"
          multiline
          maxRows={10}
          variant="filled"
          inputRef={categotyInputref}
        />
        <TextareaAutosize
          id="filled-multiline-flexible"
          label="description"
          name="category"
          multiline
          maxRows={10}
          variant="filled"
          inputRef={descriptionInputref}
        />

        {/* <TextField
          id="standard-select-currency-native"
          select
          name="description"
          variant="outlined"
          label="test"
          SelectProps={{
            multiple: true,
            value: [],
          }}
          ref={descriptionInputref}
        ></TextField> */}
        <Button type="submit" variant="contained" color="primary">
          SAVE AND PUBLISH
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer(anchor, true)}
          >
            NEW CLASSIFIED
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Drawer;
