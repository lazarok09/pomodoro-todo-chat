import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
describe("<Home />", () => {
  it("should test files", () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
