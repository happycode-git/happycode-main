// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Timestamp, getFirestore, onSnapshot, orderBy } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
import { randomString, superAdminID } from "./Global";
import { setProjectState } from "./REDUX/REDUCERS/ProjectSlice";
import { setBuildsState } from './REDUX/REDUCERS/BuildsSlice'

import emailjs from "emailjs-com";
import { setConfirmationState } from "./REDUX/REDUCERS/ConfirmationSlice";
import { setFailureState } from "./REDUX/REDUCERS/FailureSlice";

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

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: 'https://wearehappycode.com',
  // This must be true for email link sign-in.
  handleCodeInApp: true,
  
  // FDL custom domain.
};

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
    // //console.log(doc.id, " => ", doc.data());
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
    // //console.log(doc.id, " => ", doc.data());
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
      InitialPayment: snap.InitialPayment,
      HasMessage: snap.HasMessage
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
    //console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const ticket = {
      id: doc.id,
      Subject: snap.Subject,
      Page: snap.Page,
      Description: snap.Description,
      Status: snap.Status,
      ProjectID: snap.ProjectID
    }
    tickets.push(ticket)
  });
  dispatch(setMemberTicketsState(tickets))
}
export const getAllTickets = async (userID, dispatch) => {
  const q = query(collection(db, "Members", userID, "CompletedTickets"));
  const querySnapshot = await getDocs(q);
  const tickets = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
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
export const getOutline = async (userID, projectID, dispatch, setPages, setTotal) => {
  const q = query(collection(db, "Members", userID, "Projects", projectID, "Outline"));
  const querySnapshot = await getDocs(q);
  var outlineComps = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    const snap = doc.data()
    const comp = {
      id: doc.id,
      Name: snap.Name,
      Details: snap.Details,
      Info: snap.Info,
      Price: snap.Price
    }
    console.log(comp)
    outlineComps.push(comp)
  });
  dispatch(setOutlineState(outlineComps))
  setPages(outlineComps)
  for (var i in outlineComps) {
    var temp = 0
    for (var i in outlineComps) {
      const comp = outlineComps[i]
      temp += parseInt(comp.Price)
    }
  }
  setTotal(temp)
}
// 
export const getPartners = async (dispatch, setTempPartners, myID) => {
  const q = query(collection(db, "Members"), where("Admin", "==", myID), orderBy("TicketCount", "desc"));
  const querySnapshot = await getDocs(q);
  const partners = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
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
    partners.push(partner)
  });

  dispatch(setPartnersState(partners))
  setTempPartners(partners)
}
export const getAllPartners = async (dispatch, setTempPartners) => {
  const q = query(collection(db, "Members"), orderBy("TicketCount", "desc"));
  const querySnapshot = await getDocs(q);
  const partners = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
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
      Admin: snap.Admin
    }
    partners.push(partner)
  });

  dispatch(setPartnersState(partners))
  setTempPartners(partners)
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
      CurrentSiteURL: snap.CurrentSiteURL,
      DropboxURL: snap.DropboxURL,
      InitialPayment: snap.InitialPayment,
      HasMessage: snap.HasMessage
    }
    projectArr.push(project)
  });
  dispatch(setProjectsListState(projectArr))
}
export const getProspects = async (dispatch, myID) => {
  const q = query(collection(db, "Prospects"), where("Admin", "==", myID), orderBy("BusinessType"));
  const querySnapshot = await getDocs(q);
  const prospects = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
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
      Details: snap.Details,
      Admin: snap.Admin
    }

    prospects.push(prospect)
  });

  dispatch(setProspectsState(prospects))

}
export const getAllProspects = async (dispatch) => {
  const q = query(collection(db, "Prospects"), orderBy("BusinessType"));
  const querySnapshot = await getDocs(q);
  const prospects = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
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
      Details: snap.Details,
      Admin: snap.Admin
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
export const getTicketCount = async (userID, dispatch) => {
  const q = query(collection(db, "Members", userID, "Tickets"));
  const querySnapshot = await getDocs(q);
  const num = querySnapshot.size
  updateTicketCount(userID, num)
    .then(() => {
      updateTicketPartner(userID, dispatch)
        .then(() => {
          getPartners(dispatch)
        })
    })
}
export const updateTicketCount = async (userID, ticketCount) => {
  const ticketCountRef = doc(db, "Members", userID);

  await updateDoc(ticketCountRef, {
    TicketCount: ticketCount
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
export const updateFirebaseURL = async (userID, project, URL, dispatch) => {
  const projectRef = doc(db, "Members", userID, "Projects", project.id)

  await updateDoc(projectRef, {
    URL: URL
  })
    .then(() => {
      const newProj = {
        ...project,
        DropboxURL: URL
      }
      dispatch(setProjectState(newProj))
    })
}
export const updateDropboxURL = async (userID, project, URL, dispatch) => {
  const projectRef = doc(db, "Members", userID, "Projects", project.id)

  await updateDoc(projectRef, {
    DropboxURL: URL
  })
    .then(() => {
      const newProj = {
        ...project,
        DropboxURL: URL
      }
      dispatch(setProjectState(newProj))
    })
}
export const addOutlinePage = async (userID, project, page, pages, dispatch) => {
  console.log()
  await setDoc(doc(db, "Members", userID, "Projects", project.id, "Outline", page.id), {
    Details: page.Details,
    Info: "",
    Name: page.Name,
    Price: page.Price
  });

  var tempPages = [...pages]
  tempPages.push({
    Details: page.Details,
    Info: "",
    Name: page.Name,
    Price: page.Price
  })
  dispatch(setOutlineState(tempPages))
}

export const updateOutline = async (memberID, projID, outline, dispatch) => {
  updatePaymentInfo(memberID, projID, outline)
    .then(() => {
      updateOutlineFunc(memberID, projID, outline)
    })

}
const updateOutlineFunc = async (memberID, projID, outline) => {
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
const updatePaymentInfo = async (memberID, projID, outline) => {
  var total = 0
  for (var i in outline) {
    const comp = outline[i]
    total += parseInt(comp.Price)
  }

  const projDoc = doc(db, "Members", memberID, "Projects", projID);

  // Set the "capital" field of the city 'DC'
  await updateDoc(projDoc, {
    InitialPayment: total * 0.25,
    Subscription: total * 0.25 * 0.15
  });
}
export const removeOutlineComp = async (memberID, projID, comp) => {
  await deleteDoc(doc(db, "Members", memberID, "Projects", projID, "Outline", comp.id));
}

export const createPartnerAccount = async (form, proj) => {
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
    TicketCount: 0,
    Admin: superAdminID
  }).then(() => {
    firebaseCreateUser(form.Email, "HappyCode123!")
    createPartnerProject(docID, proj)
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
    URL: 'https://happy-code-templates.web.app',
    HasMessage: true
  })
  setProjectMessage(memberID, proj.id, "Hello, welcome to our brand new messaging system provided by Happy Code Dev. Use this window to view and send any comments, concerns, or questions you may have for our developers. We will be sure to get back to you as soon as we can. Thanks!", "pQ4xq1K9UXfmhYIMzKmS")
  setMessageFlag(memberID, proj.id)
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
export const setProspectDoc = async (pros, myID) => {
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
    Details: pros.Details,
    Admin: myID
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
export const removeProspectDoc = async (pros) => {
  await deleteDoc(doc(db, "Prospects", pros.id));
}
export const setBuildInfo = async (partnerID, projectID, args) => {
  await setDoc(doc(db, "Members", partnerID, "Projects", projectID, "Builds", args.id), {
    Date: args.Date,
    Admin: args.Admin,
    Desc: args.Desc,
  });
}
export const getBuildInfo = async (partnerID, projectID, setTempBuilds) => {
  var builds = []
  const querySnapshot = await getDocs(collection(db, "Members", partnerID, "Projects", projectID, "Builds"), orderBy("Date", "asc"));
  querySnapshot.forEach((doc) => {
    const build = {
      id: doc.id,
      Date: doc.data().Date,
      Admin: doc.data().Admin,
      Desc: doc.data().Desc
    }
    builds.push(build)
  });
  const temp = builds.sort((a, b) => a.Date.seconds - b.Date.seconds).reverse();
  setTempBuilds(temp)
}
export const sendReferralEmail = async (email, html, dispatch) => {

  var templateParams = {
    to_email: email,
    from_email: "happycode.inbox@gmail.com",
    reply_to: "happycode.inbox@gmail.com",
    html: html
  };

  await emailjs.send('service_xq1rj6f', 'template_2bgxdcm', templateParams, 'eaOYb8X6nqSrLTHBS')
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      dispatch(setConfirmationState(true))
      setTimeout(() => {
        dispatch(setConfirmationState(false))
        window.scrollTo(0, 0)
      }, 2000);
    }, function (error) {
      console.log('FAILED...', error);
      dispatch(setFailureState(true))
      setTimeout(() => {
        dispatch(setFailureState(false))
        window.scrollTo(0, 0)
      }, 2000);
    });

}
export const getProjectMessages = async (userID, projectID, setMessages) => {
  const q = await query(collection(db, "Members", userID, "Projects", projectID, 'Messages'), orderBy("Date", "desc"));
  const _ = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      const d = {
        ...doc.data(),
        Date: new Date(doc.data().Date.seconds * 1000).toLocaleString()
      }

      messages.push(d)
    });
    setMessages(messages)
    console.log(messages)
  });
}
export const setProjectMessage = async (userID, projectID, message, myID) => {
  await setDoc(doc(db, "Members", userID, "Projects", projectID, "Messages", randomString(25)), {
    Message: message,
    Date: Timestamp.fromDate(new Date()),
    SenderID: myID,
    ReceiverID: userID
  });
}
export const setMessageFlag = async (userID, projectID) => {
  const washingtonRef = doc(db, "Members", userID, "Projects", projectID);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    HasMessage: true
  });
}
export const removeMessageFlag = async (userID, projectID) => {
  const washingtonRef = doc(db, "Members", userID, "Projects", projectID);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    HasMessage: false
  });
}
export const firebaseReset = async (email) => {
  sendPasswordResetEmail(auth, email, actionCodeSettings)
}



// AUTH
/*

// ----------------- NEW USER--------------------
import { createUserWithEmailAndPassword } from "firebase/auth";

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

// ----------------- SIGN IN USER--------------------
import { signInWithEmailAndPassword } from "firebase/auth";

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

    // -----------------SIGN OUT USER--------------------
    import { signOut } from "firebase/auth";

    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

    // ----------------- CURRENT SIGNED IN USER--------------------
    const user = auth.currentUser;

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
    } else {
        // No user is signed in.
    }

    // ----------------- VERIFY EMAIL USER--------------------
    import { sendEmailVerification } from "firebase/auth";

    sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            // ...
        });

    // -----------------SEND NEW PASSWORD EMAIL--------------------
    import { sendPasswordResetEmail } from "firebase/auth";

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    // -----------------DELETE USER--------------------
    import { deleteUser } from "firebase/auth";

    const user = auth.currentUser;

    deleteUser(user).then(() => {
        // User deleted.
    }).catch((error) => {
        // An error ocurred
        // ...
    });

*/

// FIRESTORE
/*
// -----------------NEW DOC--------------------

import { doc, setDoc } from "firebase/firestore";

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
});

// -----------------GET DOCS LISTENER--------------------

import { collection, query, where, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});

// -----------------GET DOC--------------------

import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}

// -----------------GET DOCS--------------------

import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});

// -----------------ORDER BY / LIMIT--------------------

import { query, orderBy, limit } from "firebase/firestore";

const q = query(citiesRef, orderBy("name"), limit(3));

// -----------------COMPOUND--------------------

import { query, where, orderBy, limit } from "firebase/firestore";

const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));

// -----------------UPDATE DOC--------------------

import { doc, updateDoc } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
    capital: true
});

// -----------------DELETE DOC--------------------

import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "cities", "DC"));

*/


