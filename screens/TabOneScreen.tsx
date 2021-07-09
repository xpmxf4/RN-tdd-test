import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";

import { Text, View } from "../components/Themed";

interface name {
  name: String;
}

export const GET_DOG_QUERY = gql`
  query GetDog($name: String) {
    dog(breed: $name) {
      id
      name
      breed
    }
  }
`;

export default function TabOneScreen({ name }: name) {
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: { name },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <Text>loading....</Text>
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          data?.dogs?.map((dogs: any) => <Text key={dogs.id}>{dogs.breed}</Text>)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
