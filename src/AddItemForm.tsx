import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";

import { ChangeEvent, KeyboardEvent, useState } from "react";
type AddItemFormTypes = {
  addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormTypes) {
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };
  const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.code === "Enter") {
      onClickAddTodo();
    }
  };
  const onClickAddTodo = () => {
    if (val.trim() !== "") {
      props.addItem(val.trim());
      setVal("");
      setError(null);
    } else {
      setError("Field is required");
    }
  };

  const [val, setVal] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <TextField
        value={val}
        variant="outlined"
        label="Type Value"
        onChange={onchangeHandler}
        onKeyPress={onKeyPressInput}
        error={!!error}
        helperText={error}
      />
      <IconButton  onClick={onClickAddTodo} color={"primary"}>
        <ControlPoint />
      </IconButton>
      
    </div>
  );
}
