// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, orderBy } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { setSiteAlertState } from "./REDUX/REDUCERS/SiteAlertsSlice";
import { setUserState } from './REDUX/REDUCERS/UserSlice'
import { collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { setLoadingState } from './REDUX/REDUCERS/LoadingSlice'
import { setToggleSiteAlertState } from './REDUX/REDUCERS/ToggleSiteAlertSlice'
import { setProjectsListState } from './REDUX/REDUCERS/ProjectsListSlice'
import { setMemberTicketsState } from './REDUX/REDUCERS/MemberTicketsSlice'
import { setAdminUserState } from './REDUX/REDUCERS/AdminUserSlice'
import { setPartnersState } from './REDUX/REDUCERS/PartnersSlice'
import { setAllTicketsState } from './REDUX/REDUCERS/AllTicketsSlice'
import { setProspectsState } from './REDUX/REDUCERS/ProspectsSlice'
import { setOutlineState } from './REDUX/REDUCERS/OutlineSlice'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { randomString } from "./Global";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-igrixPpYUrC5xGrOZq3mS6aDjY1hdF0",
  authDomain: "happycode-5403.firebaseapp.com",
  projectId: "happycode-5403",
  storageBucket: "happycode-5403.appspot.com",
  messagingSenderId: "301345964298",
  appId: "1:301345964298:web:a2cd7e91f1f208e0a07af3",
  measurementId: "G-8NC05BHRG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const firebaseSignIn = async (dispatch, navigate, email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      getUser(email, navigate, dispatch);
      // console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      dispatch(setToggleSiteAlertState(true))
      dispatch(setLoadingState(false))
      if (errorCode == "auth/wrong-password") {
        dispatch(setSiteAlertState("You have entered an incorrect password."))
      } else if (errorCode == "auth/user-not-found") {
        dispatch(setSiteAlertState("This email is not in our records."))
      } else if (errorCode == "auth/invalid-email") {
        dispatch(setSiteAlertState("This email is in wrong format."))
      } else {
        dispatch(setSiteAlertState("Something went wrong. Try again."))
      }
    });
}
export const firebaseSignOut = (navigate) => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/webline')
  }).catch((error) => {
    // An error happened.
  });
}
export const firebaseAdminSignIn = async (dispatch, navigate, email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      // getUser(email, navigate, dispatch);

      getAdminUser(email, navigate, dispatch)

      // console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      dispatch(setToggleSiteAlertState(true))
      dispatch(setLoadingState(false))
      if (errorCode == "auth/wrong-password") {
        dispatch(setSiteAlertState("You have entered an incorrect password."))
      } else if (errorCode == "auth/user-not-found") {
        dispatch(setSiteAlertState("This email is not in our records."))
      } else if (errorCode == "auth/invalid-email") {
        dispatch(setSiteAlertState("This email is in wrong format."))
      } else {
        dispatch(setSiteAlertState("Something went wrong. Try again."))
      }
    });
}
export const firebaseAdminSignOut = (navigate) => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/admin')
  }).catch((error) => {
    // An error happened.
  });
}
export const firebaseCreateUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
// 
export const getUser = async (email, navigate, dispatch) => {
  const q = query(collection(db, "Members"), where("Email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    dispatch(setUserState({
      id: doc.id,
      Address: snap.Address,
      BusinessEmail: snap.BusinessEmail,
      BusinessName: snap.BusinessName,
      Email: snap.Email,
      FirstName: snap.FirstName,
      LastName: snap.LastName,
      Phone: snap.Phone,
      TicketCount: snap.TicketCount
    }))
    dispatch(setSiteAlertState(""))
    dispatch(setLoadingState(false))
    navigate('/projects')
  });

}
export const getAdminUser = async (email, navigate, dispatch) => {
  const q = query(collection(db, "AdminMembers"), where("Email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    dispatch(setAdminUserState({
      id: doc.id,
      Email: snap.Email,
      FirstName: snap.FirstName,
      LastName: snap.LastName
    }))
    dispatch(setSiteAlertState(""))
    dispatch(setLoadingState(false))
    navigate('/admindash')
  });

}
export const getProjects = async (userID, dispatch) => {
  const q = query(collection(db, "Members", userID, "Projects"), orderBy("Name"));

  const querySnapshot = await getDocs(q);
  var projectArr = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const snap = doc.data()
    const project = {
      id: doc.id,
      Name: snap.Name,
      Description: snap.Description,
      Subscription: snap.Subscription,
      URL: snap.URL,
      Status: snap.Status,
      ContractSigned: snap.ContractSigned,
      DropboxURL: snap.DropboxURL,
      InitialPayment: snap.InitialPayment
    }
    projectArr.push(project)
  });
  dispatch(setProjectsListState(projectArr))
}
export const getTickets = async (userID, projectID, dispatch) => {
  const q = query(collection(db, "Members", userID, "Tickets"), where("ProjectID", "==", projectID));
  const querySnapshot = await getDocs(q);
  const tickets = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const ticket = {
      id: doc.id,
      Subject: snap.Subject,
      Page: snap.Page,
      Description: snap.Description,
      Status: snap.Status,
      ProjectID: snap.ProjectID
    }
    console.log(ticket)
    tickets.push(ticket)
  });
  dispatch(setMemberTicketsState(tickets))
}
export const getAllTickets = async (userID, dispatch) => {
  console.log(userID)
  const q = query(collection(db, "Members", userID, "CompletedTickets"));
  const querySnapshot = await getDocs(q);
  const tickets = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const ticket = {
      id: doc.id,
      Subject: snap.Subject,
      Page: snap.Page,
      Description: snap.Description,
      Status: snap.Status,
    }
    tickets.push(ticket)
  });
  dispatch(setAllTicketsState(tickets))
}
export const getOutline = async (userID, projectID, dispatch) => {
  const q = query(collection(db, "Members", userID, "Projects", projectID, "Outline"));
  const querySnapshot = await getDocs(q);
  var outlineComps = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const comp = {
      id: doc.id,
      Name: snap.Name,
      Details: snap.Details,
      Info: snap.Info,
      Price: snap.Price
    }
    outlineComps.push(comp)
  });
  dispatch(setOutlineState(outlineComps))
}
// 
export const getPartners = async (dispatch) => {
  const q = query(collection(db, "Members"), orderBy("TicketCount", "desc"));
  const querySnapshot = await getDocs(q);
  const partners = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const partner = {
      id: doc.id,
      Address: snap.Address,
      BusinessEmail: snap.BusinessEmail,
      BusinessName: snap.BusinessName,
      Email: snap.Email,
      FirstName: snap.FirstName,
      LastName: snap.LastName,
      Phone: snap.Phone,
      TicketCount: snap.TicketCount,
    }
    console.log(partner)
    partners.push(partner)
  });

  dispatch(setPartnersState(partners))

}
export const getPartnerProjects = async (memberID, dispatch) => {
  const q = query(collection(db, "Members", memberID, "Projects"), orderBy("Name"));

  const querySnapshot = await getDocs(q);
  var projectArr = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const snap = doc.data()
    const project = {
      id: doc.id,
      Name: snap.Name,
      Description: snap.Description,
      Subscription: snap.Subscription,
      URL: snap.URL,
      Status: snap.Status,
      ContractSigned: snap.ContractSigned,
      DropboxURL: snap.DropboxURL,
      InitialPayment: snap.InitialPayment
    }
    projectArr.push(project)
  });
  dispatch(setProjectsListState(projectArr))
}
export const getProspects = async (dispatch) => {
  const q = query(collection(db, "Prospects"), orderBy("BusinessType"));
  const querySnapshot = await getDocs(q);
  const prospects = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const prospect = {
      id: doc.id,
      BusinessName: snap.BusinessName,
      ContactFullName: snap.ContactFullName,
      ContactPhone: snap.ContactPhone,
      Email: snap.Email,
      BusinessAddress: snap.BusinessAddress,
      City: snap.City,
      State: snap.State,
      Zip: snap.Zip,
      HasWebsite: snap.HasWebsite,
      WebsiteURL: snap.WebsiteURL,
      SampleURL: snap.SampleURL,
      BusinessType: snap.BusinessType,
      Details: snap.Details
    }

    prospects.push(prospect)
  });

  dispatch(setProspectsState(prospects))

}
// 
export const setTicket = async (userID, ticketID, ticket, projectID) => {
  await setDoc(doc(db, "Members", userID, "Tickets", ticketID), {
    Subject: ticket.Subject,
    Page: ticket.Page,
    Description: ticket.Description,
    Status: "In Progress",
    ProjectID: projectID
  });
}
export const updateTicketCount = async (userID, ticketCount) => {
  const ticketCountRef = doc(db, "Members", userID);
  const newTicketCount = ticketCount + 1

  await updateDoc(ticketCountRef, {
    TicketCount: newTicketCount
  });
}
export const updateTicketMinusCount = async (userID, ticketCount) => {
  const ticketCountRef = doc(db, "Members", userID)
  const newTicketCount = ticketCount - 1
  await updateDoc(ticketCountRef, {
    TicketCount: newTicketCount
  })
}
export const updateTicketPartner = async (userID, dispatch) => {
  const docRef = doc(db, "Members", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const snap = docSnap.data()
    const user = {
      id: doc.id,
      Address: snap.Address,
      BusinessEmail: snap.BusinessEmail,
      BusinessName: snap.BusinessName,
      Email: snap.Email,
      FirstName: snap.FirstName,
      LastName: snap.LastName,
      Phone: snap.Phone,
      TicketCount: snap.TicketCount
    }
    dispatch(setPartnersState(user))

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
export const updateTicketUser = async (userID, dispatch) => {
  const docRef = doc(db, "Members", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const snap = docSnap.data()
    const user = {
      id: doc.id,
      Address: snap.Address,
      BusinessEmail: snap.BusinessEmail,
      BusinessName: snap.BusinessName,
      Email: snap.Email,
      FirstName: snap.FirstName,
      LastName: snap.LastName,
      Phone: snap.Phone,
      TicketCount: snap.TicketCount
    }
    dispatch(setUserState(user))
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export const updateOutline = async (memberID, projID, outline) => {
  for (var idx in outline) {
    const comp = outline[idx]
    await updateDoc(doc(db, "Members", memberID, "Projects", projID, "Outline", comp.id), {
      Name: comp.Name,
      Details: comp.Details,
      Info: comp.Info.replaceAll("\n", "jjj"),
      Price: comp.Price
    })
  }
}
export const createPartnerAccount = async (form, proj, outline) => {
  // Add a new document in collection "cities"
  const docID = randomString(30)
  await setDoc(doc(db, "Members", docID), {
    Address: form.Address,
    BusinessEmail: form.BusinessEmail,
    BusinessName: form.BusinessName,
    Email: form.Email,
    FirstName: form.FirstName,
    LastName: form.LastName,
    Phone: form.Phone,
    TicketCount: 0
  }).then(() => {
    firebaseCreateUser(form.Email, "HappyCode123!")
    createPartnerProject(docID, proj)
      .then(() => {
        createOutline(docID, proj.id, outline)
      })
  });
}
export const createPartnerProject = async (memberID, proj) => {
  await setDoc(doc(db, "Members", memberID, "Projects", proj.id), {
    ContractSigned: new Date().toDateString(),
    CurrentSiteURL: proj.CurrentSiteURL,
    Description: proj.Description,
    DropboxURL: proj.DropboxURL,
    InitialPayment: proj.InitialPayment,
    Name: proj.Name,
    SiteExists: proj.SiteExists,
    Status: "In Progress",
    Subscription: proj.Subscription,
    URL: proj.URL
  })
}
export const createOutline = async (memberID, projID, outline) => {
  for (var idx in outline) {
    const comp = outline[idx]
    await setDoc(doc(db, "Members", memberID, "Projects", projID, "Outline", randomString(25)), {
      Name: comp.Name,
      Details: comp.Details,
      Info: comp.Info.replaceAll("\n", "jjj"),
      Price: comp.Price
    })
  }
}
export const completePartnerTicket = async (partnerID, ticketID, ticket) => {
  await deleteDoc(doc(db, "Members", partnerID, "Tickets", ticketID));
  await setDoc(doc(db, "Members", partnerID, "CompletedTickets", ticketID), {
    Subject: ticket.Subject,
    Page: ticket.Page,
    Description: ticket.Description,
    Status: "Complete"
  });
}
export const rejectPartnerTicket = async (partnerID, ticketID, ticket) => {
  await deleteDoc(doc(db, "Members", partnerID, "Tickets", ticketID));
  await setDoc(doc(db, "Members", partnerID, "RejectedTickets", ticketID), {
    Subject: ticket.Subject,
    Page: ticket.Page,
    Description: ticket.Description,
    Status: "Rejected"
  });
}
export const setProspectDoc = async (pros) => {
  await setDoc(doc(db, "Prospects", pros.id), {
    id: pros.id,
    BusinessName: pros.BusinessName,
    ContactFullName: pros.ContactFullName,
    ContactPhone: pros.ContactPhone,
    Email: pros.Email,
    BusinessAddress: pros.BusinessAddress,
    City: pros.City,
    State: pros.State,
    Zip: pros.Zip,
    HasWebsite: pros.HasWebsite,
    WebsiteURL: pros.WebsiteURL,
    SampleURL: pros.SampleURL,
    BusinessType: pros.BusinessType,
    Details: pros.Details
  });
}
export const editProspectDoc = async (pros) => {
  const washingtonRef = doc(db, "Prospects", pros.id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    id: pros.id,
    BusinessName: pros.BusinessName,
    ContactFullName: pros.ContactFullName,
    ContactPhone: pros.ContactPhone,
    Email: pros.Email,
    BusinessAddress: pros.BusinessAddress,
    City: pros.City,
    State: pros.State,
    Zip: pros.Zip,
    HasWebsite: pros.HasWebsite,
    WebsiteURL: pros.WebsiteURL,
    SampleURL: pros.SampleURL,
    BusinessType: pros.BusinessType,
    Details: pros.Details
  });
}