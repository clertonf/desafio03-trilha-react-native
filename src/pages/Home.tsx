import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const equalTasks = tasks.find((task) => task.title === newTaskTitle);

    if (equalTasks) {
      return Alert.alert("Você não pode cadastrar uma task com o mesmo nome");
    }

    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const checkTask = tasks.map((task) => ({ ...task }));

    const findTask = checkTask.find((item) => item.id === id);

    if (!findTask) {
      return;
    }

    findTask.done = !findTask.done;
    setTasks(checkTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
        },
        {
          text: "Sim",
          onPress: () => {
            const deleteTask = tasks.filter((task) => task.id !== id);
            setTasks(deleteTask);
          },
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updateTask = tasks.map((task) => ({ ...task }));

    const taskToBeMarkedAsDone = updateTask.find((item) => item.id === taskId);

    if (!taskToBeMarkedAsDone) {
      return;
    }

    taskToBeMarkedAsDone.title = taskNewTitle;
    setTasks(updateTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
