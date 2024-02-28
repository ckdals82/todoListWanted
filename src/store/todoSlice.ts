import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoListData } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as ITodoListData[];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<ITodoListData>) => {
        state.push(action.payload);
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        } as ITodoListData,
      }),
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { addTodo, deleteTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
