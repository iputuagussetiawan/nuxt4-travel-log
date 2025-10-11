import defineAuthenticatedEventHandler from '~/lib/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
    return {
        success: true
    }
})
