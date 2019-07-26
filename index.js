const Router = require('./router')
const Flagger = require('flagger')
/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handler(request) {
    await Flagger.configure({
        apiDomain: 'staging.airshiphq.com',
        subscribeToUpdates: false,
        envKey: 'ia6fvljhthybc7zy',
    })

    const flag = Flagger.flag('brand-refresh')

    const data = {
        isEnabled: flag.isEnabled({ id: 1 }),
        isEligible: flag.isEligible({ id: 1 }),
        getPayload: flag.getPayload({ id: 1 }),
        getTreatment: flag.getTreatment({ id: 1 }),
    }

    const init = {
        headers: { 'content-type': 'application/json' },
    }

    const resp = new Response(JSON.stringify(data), init)

    return resp
}

async function handleRequest(request) {
    const r = new Router()

    r.get('/', req => handler(req)) // return a default message for the root route

    const resp = await r.route(request)
    return resp
}
