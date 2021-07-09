import * as React from "react";
import { ScrollView } from "react-native";
import TestRenderer from "react-test-renderer";
import waitForExpect from "wait-for-expect";
import { MockedProvider } from "@apollo/client/testing";
import TabOneScreen, { GET_DOG_QUERY } from "./TabOneScreen";
import { waitFor } from "@testing-library/dom";
import { Text } from "../components/Themed";

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: "Buck",
      },
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck", breed: "poodle" },
      },
    },
  },
];

test("it renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TabOneScreen name={"poodle"} />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("should render dog", () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      vaiables: { name: "Buck" },
    },
    result: {
      data: { dog: { id: 1, name: "Buck", breed: "poodle" } },
    },
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <TabOneScreen name={"Buck"} />
    </MockedProvider>
  );

  const scrollView = component.root.findAllByType(Text);

  // await new Promise((resolve) => setTimeout(resolve, 0));
  expect(scrollView.join("").).toContain("loading...");
});
