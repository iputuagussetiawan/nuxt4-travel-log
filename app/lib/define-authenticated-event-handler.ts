import type { EventHandler, H3Event, H3EventContext } from 'h3'
import type { UserWithId } from './auth'

type AuthenticatedEvent = H3Event & {
    context: H3EventContext & {
        user: UserWithId
    }
}

export default function defineAuthenticatedEventHandler(
    handler: (even: AuthenticatedEvent) => any
) {
    return defineEventHandler(async (event) => {
        if (!event.context.user) {
            return sendError(
                event,
                createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized'
                })
            )
        }
        return handler(event as AuthenticatedEvent)
    })
}
