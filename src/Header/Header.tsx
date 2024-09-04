import { useRef, useState } from "react";
import { fetchTeam } from "../api";
import "./Header.scss";
import { ReactComponent as Logo } from "../Icons/logo.svg";
import { ReactComponent as LogoWritten } from "../Icons/logoWritten.svg";
export const Header = ({ setFilteredData }: { setFilteredData: any }) => {
  const dialogRef = useRef<any>();
  const [teamId, setTeamId] = useState<string|undefined>();
  const [isOpen, setIsOpen]= useState<boolean>(false);

  function openDialog() {
    if (dialogRef) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  }
  function fetchTeamDetails() {
    if (teamId) {
      fetchTeam(teamId)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setFilteredData(response.data);
          }
        })
        .catch((err) => {
          console.log("error fetching team", err);
        })
        .finally(() => {
          setTeamId("");
          dialogRef.current.close();
        });
    }
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#37003c",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexBasis: "70%",
            height: "70px",
          }}
        >
          <Logo
            style={{
              flexBasis: "20%",
              maxWidth: "fit-content",
              borderRadius: "25px",
            }}
          ></Logo>
          <LogoWritten
            style={{ flexBasis: "80%", maxWidth: "fit-content" }}
          ></LogoWritten>
        </div>
        <div style={{ flexBasis: "10%" }}>
          <button className="responsive-button" onClick={openDialog}>
            Connect FPL team
          </button>
        </div>
      </div>
      {isOpen && <div className="modalOverlay"/>}
      <dialog ref={dialogRef} className="dialogSection">
        <form className="labelContainer">
          <label htmlFor="ismLeagueName">
            <span className="teamLabel">Please plug in your FPL Team ID</span>
          </label>
          <div className="inputContainer">
            <input
              id="ismLeagueName"
              maxLength={10}
              className="teamidInput"
              type={"number"}
              value={teamId}
              onChange={(params) => {
                setTeamId(params.target.value);
              }}
            />
          </div>
        </form>
        <div className="buttonContainer">
          <button className="submitButton" onClick={fetchTeamDetails}>
            Submit
          </button>
          <button
            className="cancelButton"
            onClick={() => {
              dialogRef.current.close();
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};
