import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "reactstrap";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ListView from "../../ui-elements/data-list/ListView";
import Loader from "../../ui-elements/loader/loader";

import { logoutWithJWT } from "../../../redux/actions/auth/loginActions";
import UserService from "../../../services/UserService";
import OfficeService from "../../../services/OfficeService";
import { onGetUsersByFilter } from "../../../redux/reducers/user/userRedux";

export default function UsersComponent(props) {
  const dispatch = useDispatch();

  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      width: 200,
      filter: true,
      cellRendererFramework: (params) => {
        const userData = params.data;
        return <div>{userData.first_name + " " + userData.last_name}</div>;
      },
    },
    {
      headerName: "Email",
      field: "email",
      filter: true,
      width: 300,
    },
    {
      headerName: "Location",
      field: "locations",
      filter: true,
      width: 300,
    },
    {
      headerName: "Type",
      field: "user_role",
      width: 150,
      cellRendererFramework: (params) => {
        const userData = params.data;
        return (
          <div className="badge badge-pill badge-success-green">
            {userData.user_role}
          </div>
        );
      },
    },
    // {
    //     headerName: "Invite",
    //     field: "",
    //     width: 200,
    //     cellRendererFramework: params => {
    //         const userData = params.data;
    //         return (
    //             <Button.Ripple
    //                 color="primary"
    //                 onClick={() => {
    //                     const payload = {
    //                         from: localStorage.getItem("userData").email,
    //                         to: userData.email,
    //                         message: "You can accept this invitation. https://app.officernd.com/",
    //                     }
    //                     UserService.inviteMember(payload).then(response => {
    //                         if (response.data.status === "success") {
    //                             SweetAlert.fire("Success", "Email was sent to <" + userData.email +"> successfully!");
    //                         } else {
    //                             SweetAlert.fire("Error", "Email was not sent!","error");
    //                         }
    //                     });
    //                 }}
    //                 >
    //                 Invite
    //             </Button.Ripple>
    //         )
    //     }
    // },
    {
      headerName: "Status",
      field: "status",
      width: 200,
      cellRendererFramework: (params) => {
        const memberData = params.data;
        let checked = memberData.status === "active" ? true : false;
        return (
          <CustomInput
            className="custom-switch-danger mr-1 mt-1"
            type="switch"
            id={"active-member" + memberData.user_id}
            name={"active-member" + memberData.user_id}
            checked={checked}
            onChange={(e) => {
              checked = !checked;
              let payload = {
                user_id: memberData.user_id,
                status: e.target.checked ? "active" : "deActive",
              };
              UserService.update({ updatedUser: payload }).then((response) => {
                console.log(response.data);
                onGetUserData();
              });
            }}
            inline
          ></CustomInput>
        );
      },
    },
  ];

  const resCurrentOfficeId = useSelector(
    (state) => state.officeReducer.currentOffice
  );
  let resUserData = useSelector((state) => state.userRedux.userData);
  const isFetchData = useSelector((state) => state.userRedux.isFetchData);

  const [setUserData] = useState([]);

  useEffect(() => {
    const { location_id } =
      localStorage.getItem("userToken") !== ""
        ? JSON.parse(localStorage.getItem("userData"))
        : {};
    let payload = {
      officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
    };
    dispatch(onGetUsersByFilter(payload));

    // onGetUserData();
  }, []);

  const onGetUserData = () => {
    let unmounted = false;

    // Get all members
    UserService.getAll()
      .then((response) => {
        if (!unmounted) {
          onGetOffices(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("ERROR ", error.response.data);
        } else if (error.request) {
          console.log("ERROR ", error.request);
        } else {
          console.log("Bad Request");
        }
      });
    return () => {
      unmounted = true;
    };
  };

  const onGetOffices = (members) => {
    // Get all offices -> locations
    OfficeService.getAllOffices()
      .then((response) => {
        if (response.data.status === 200) {
          const offices = response.data.result;
          let userDataArray = [];
          for (let i = 0; i < members.length; i++) {
            const updateLocations = { ...members[i], offices: offices };
            userDataArray = [...userDataArray, updateLocations];
          }
          setUserData(userDataArray);
        } else if (response.data.status === 401) {
          dispatch(logoutWithJWT());
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("ERROR ", error.response.data);
        } else if (error.request) {
          console.log("ERROR ", error.request);
        } else {
          console.log("Bad Request");
        }
      });
  };

  return (
    <div>
      {!isFetchData && <Loader />}
      {isFetchData && (
        <>
          <Breadcrumbs
            breadCrumbTitle="Active Members"
            breadCrumbParent="Pages"
            breadCrumbActive="Members"
          />
          <ListView
            rowData={resUserData}
            columnDefs={columnDefs}
            menu="Member"
            isAddButton={true}
            isFilter={false}
          />
        </>
      )}
    </div>
  );
}
