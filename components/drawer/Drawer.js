import { useRef } from "react";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styleClasses from "./Drawer.module.css";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: "auto",
  },
});

// dropdown values
const categories = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Community",
    label: "Community",
  },
  {
    value: "Professional",
    label: "Professional",
  },
  {
    value: "Housing",
    label: "Housing",
  },
  {
    value: "Buying",
    label: "Buying",
  },
  {
    value: "Selling",
    label: "Selling",
  },
  {
    value: "Jobs",
    label: "Jobs",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Commercial",
    label: "Commercial",
  },
];

//drawer component
const Drawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const [category, setCategory] = React.useState("Commercial");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const titleInputref = useRef();
  const categotyInputref = useRef();
  const descriptionInputref = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputref.current.value;
    const enteredCategory = categotyInputref.current.value;
    const enteredDescription = descriptionInputref.current.value;

    const cardData = {
      title: enteredTitle,
      category: enteredCategory,
      description: enteredDescription,
      favorite: false,
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
      setState({ ...state, ["right"]: false });
    }
    addCardDataHandler(cardData);
  }

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
      <div className={styleClasses.drawerCard}>
        <div className={styleClasses.drawerCloseIcon}>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <h2>New Classified</h2>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <div className={styleClasses.DrawerTextField}>
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="filled"
              className={styleClasses.DropTextField}
              inputRef={titleInputref}
            />
          </div>
          <div className={styleClasses.DrawerTextField}>
            <TextField
              id="category"
              select
              label="Category"
              value={category}
              onChange={handleChange}
              variant="filled"
              inputRef={categotyInputref}
              className={styleClasses.DropTextField}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={styleClasses.DrawerTextField}>
            <TextareaAutosize
              id="filled-multiline-flexible"
              label="Description"
              name="description"
              multiline
              maxRows={10}
              minRows={10}
              variant="filled"
              className={styleClasses.DropTextField}
              inputRef={descriptionInputref}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styleClasses.rbtnDrawer}
          >
            SAVE AND PUBLISH
          </Button>
        </form>
      </div>
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
