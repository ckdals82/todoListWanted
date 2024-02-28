// 리액트
import { useState } from 'react';
// Material-UI Imports
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// Other Imports
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addTodo, deleteTodo, setTodoStatus } from '../store/todoSlice';
import { ITodoListData } from '../models/Todo';


const List =() => {
  const [todoDescription, setTodoDescription] = useState<string>('');

  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container maxWidth='xs'>
      <Typography style={{ textAlign: 'center' ,marginBottom: '20px' }} variant='h3'>
        원티드 TodoList
      </Typography>
      <TextField
        variant='outlined'
        label='오늘의 할 일'
        fullWidth
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={() => {
          dispatch(addTodo(todoDescription));
          setTodoDescription('');
        }}
      >
        등록
      </Button>
      <div style={{marginTop: '20px'}}>
        {todoList.map((todo: ITodoListData) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.description}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Checkbox
                edge='end'
                value={todo.completed}
                onChange={() => {
                  dispatch(
                    setTodoStatus({ completed: !todo.completed, id: todo.id })
                  );
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </div>
    </Container>
  );
}

export default List;
