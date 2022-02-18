import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../App";
import { DatabaseStatus } from "../../App";

function SuperAdminDelete(props) {
  const [userContext, setUserContext] = useContext(DataContext);
  const [isUpdatedData, setIsUpdatedData] = useContext(DatabaseStatus);

  const type = props.type;
  const id = props.id;

  const isSuperAdmin = userContext.isSuperAdmin;

  const displayButton = isSuperAdmin ? "" : "hidden";

  const handleDelete = () => {
    console.log("delete");
    axios({
      method: "delete",
      url: `/api/${type}/superadmin/${id}`,
    }).then((response) => {
      console.log(response.data.message);
      setIsUpdatedData(false);
    });
  };
  return (
    <button
      onClick={handleDelete}
      className={`border border-red-500 bg-red-300 rounded-full mx-5 w-7 h-7 ${displayButton}`}
    >
      X
    </button>
  );
}

export default SuperAdminDelete;
