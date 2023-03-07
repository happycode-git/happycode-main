import { configureStore } from '@reduxjs/toolkit'
import siteAlertReducer from './REDUCERS/SiteAlertsSlice'
import toggleSiteAlertReducer from './REDUCERS/ToggleSiteAlertSlice'
import userReducer from './REDUCERS/UserSlice'
import loadingReducer from './REDUCERS/LoadingSlice'
import projectsListReducer from './REDUCERS/ProjectsListSlice'
import projectReducer from './REDUCERS/ProjectSlice'
import confirmationReducer from './REDUCERS/ConfirmationSlice'
import failureReducer from './REDUCERS/FailureSlice'
import memberTicketsReducer from './REDUCERS/MemberTicketsSlice'
import adminUserReducer from './REDUCERS/AdminUserSlice'
import partnersReducer from './REDUCERS/PartnersSlice'
import partnerReducer from './REDUCERS/PartnerSlice'
import allTicketsReducer from './REDUCERS/AllTicketsSlice'
import prospectsReducer from './REDUCERS/ProspectsSlice'
import outlineReducer from './REDUCERS/OutlineSlice'
import buildsReducer from './REDUCERS/BuildsSlice'

export default configureStore({
    reducer: {
        siteAlert: siteAlertReducer,
        toggleSiteAlert: toggleSiteAlertReducer,
        user: userReducer,
        loading: loadingReducer,
        projects: projectsListReducer,
        project: projectReducer,
        confirmation: confirmationReducer,
        failure: failureReducer,
        memberTickets: memberTicketsReducer,
        admin: adminUserReducer,
        partners: partnersReducer,
        partner: partnerReducer,
        alltickets: allTicketsReducer,
        prospects: prospectsReducer,
        outline: outlineReducer,
        builds: buildsReducer
    },
})