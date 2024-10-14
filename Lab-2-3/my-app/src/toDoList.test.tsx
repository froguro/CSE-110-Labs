import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import userEvent from "@testing-library/user-event";

test("Are all the items in the list displayed on the screen", () => {
  render(<ToDoList />);
  const apple = screen.getByText("Apples");
  const banana = screen.getByText("Bananas");

  expect(apple).toBeInTheDocument();
  expect(banana).toBeInTheDocument();
});

test("Is the number of items checked the same as shown in the title?", async () => {
  render(<ToDoList />);
  const initialText = screen.getByText("Items bought: 0");
  expect(initialText).toBeInTheDocument();

  const checkboxes = screen.getAllByRole("checkbox");

  await userEvent.click(checkboxes[0]);

  const updatedText = screen.getByText("Items bought: 1");
  expect(updatedText).toBeInTheDocument();

  // Simulate checking the second checkbox (now at the top)
  await userEvent.click(checkboxes[0]);

  const updatedText2 = screen.getByText("Items bought: 2");
  expect(updatedText2).toBeInTheDocument();

  await userEvent.click(checkboxes[0]);

  const updatedText3 = screen.getByText("Items bought: 1");
  expect(updatedText3).toBeInTheDocument();

  await userEvent.click(checkboxes[1]);

  const updatedText4 = screen.getByText("Items bought: 0");
  expect(updatedText4).toBeInTheDocument();
});
