import { useRef, useState } from "react";
import { fetchTeam } from "../api";
import "./Header.scss";

export const Header = ({setFilteredData}:{setFilteredData:any}) => {
  const dialogRef = useRef<any>();
  const [teamId, setTeamId] = useState<string|undefined>();
  function openDialog() {
    if (dialogRef) {
      dialogRef.current.showModal();
    }
  }
  function fetchTeamDetails() {
    if (teamId) {
      fetchTeam(teamId).then((response) => {
        if (Array.isArray(response.data)) {
          setFilteredData(response.data)
        }
      }).catch((err) => {
        console.log("error fetching team", err);
      }).finally(() => {
        setTeamId("");
        dialogRef.current.close()
      })
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#37003c",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%", height: "70px" }}>
        <img
          alt={"logoLion"}
          src="logo.jpg"
          height={70}
          style={{ borderRadius: "25px" }}
        ></img>
        <img alt={"logoLetter"} src="logoWritten.png" height={70}></img>
      </div>
      <div style={{ height: "70px", marginRight: "1%" }}>
        <button
          style={{
            margin: 0,
            background: 0,
            color: "white",
            height: "100%",
            borderLeft: "0.5px white solid",
            borderRight: "0.5px white solid",
            fontFamily:
              '"PremierSans-Heavy", Arial, "Helvetica Neue", Helvetica, sans-serif',
            fontSize: "1.4rem",
            textWrap: "nowrap",
            padding: "5px 5px",
            fontWeight: "700",
          }}
          onClick={openDialog}
        >
          Connect FPL team
        </button>
      </div>
      <dialog ref={dialogRef}>
        <form className="labelContainer">
          <label htmlFor="ismLeagueName">
            <span className="teamLabel">Team ID</span>
          </label>
          <div className="inputContainer">
            <input
              id="ismLeagueName"
              maxLength={10}
              className="teamidInput"
              type={"number"}
              value={teamId}
              onChange={(params)=>{setTeamId(params.target.value)}}
            />
          </div>
        </form>
        <div className="buttonContainer">
          <button className="submitButton" onClick={fetchTeamDetails}>Submit</button>
          <button
            className="cancelButton"
            onClick={() => {
              dialogRef.current.close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};
