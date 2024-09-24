import React from 'react';
import { Button, FontIcon } from 'react-md';

const TodoActions = ({ onEdit, onDelete, updateOn, onSave }) => (
    <div className='h__4'>
        <Button onClick={updateOn ? onSave : onEdit} icon>
            <FontIcon key={updateOn ? "save" : "edit"}>
                {updateOn ? "save" : "edit"}
            </FontIcon>
        </Button>
        <Button onClick={onDelete} icon aria-label="delete">
            <FontIcon key="delete">delete</FontIcon>
        </Button>
    </div>
);

export default TodoActions;
