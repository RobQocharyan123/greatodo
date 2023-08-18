import { ChangeEvent, useState } from "react";
import { TextField } from '@mui/material';

type EditableSpanType = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanType) {
  let [editeMode, setEditeMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditeMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditeMode(false);;
    props.onChange(title)
  };

  const onCHangeEditeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editeMode ? (
    <TextField
      onChange={onCHangeEditeHandler}
      value={title}
      onBlur={activateViewMode}
      autoFocus
      label="Standart"
      variant="standard"
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
