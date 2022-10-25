import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "darkslategrey",
  },

  screenContainer: {
    backgroundColor: "darkslategrey",
  },
  intro: {
    alignItems: "center",
    alignContent: "center",
    margin: 10,
    backgroundColor: "slategrey",
    minHeight: "70%",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "royalblue",
  },
  introText: { fontSize: 20, marginTop: 15 },
  navContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
    marginTop: 40,
  },
  searchBox: {
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.56)",
    width: "80%",
  },
  searchButton: { width: "20%" },
  radioButton: {
    width: "25%",
    alignItems: "center",
  },
  whiteText: { textAlign: "center", color: "white" },
  posterContainer: {
    width: "32%",
    margin: 2,
    backgroundColor: "slategrey",
    borderRadius: 10,
    padding: 2,
    display: "flex",
  },
  posterImageContainer: {
    height: 150,
    width: 100,
    justifyContent: "center",
    margin: 10,
  },
  posterImage: {
    width: 100,
    alignSelf: "center",
    margin: 2,
  },
  posterText: {
    height: 70,
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
  },
  modalContainer: {
    borderRadius: 10,
    marginTop: "25%",
    padding: 10,
    backgroundColor: "white",
    margin: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, textAlign: "center" },
  modalImage: { width: 200, height: 300, alignSelf: "center" },
  modalPlot: {
    textAlign: "center",
    backgroundColor: "paleblue",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderColor: "royalblue",
  },
  modalButton: {
    backgroundColor: "aliceblue",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  navButtons: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "darkslategrey",
    justifyContent: "center",
  },
});
