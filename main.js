// Inspired by the source code for https://codeberg.org/kwiat/meowad

async function getCommunityList() {
    const storage = await chrome.storage.local.get(null)
    return Object.keys(storage)
}

async function getCommunityPosts() {
    const communityList = await getCommunityList()
    const communityPosts = []

    document.querySelectorAll('article[data-testid=tweet]').forEach((tweet) => {
        const span = tweet.querySelector('article[data-testid="tweet"] > div > div > div > div > div > div > div > div:nth-child(2) > div > div > a > span > span > span') // Quite long, huh?
        if (span && communityList.includes(span.innerText)) {
            communityPosts.push(tweet)
        }
    })

    return communityPosts
}

async function removeCommunityPosts() {
    const posts = await getCommunityPosts()

    // I would've preferred a batch remove function, but I couldn't find one so this will have to do.
    // Maybe I'm just bad at searching?
    posts.forEach((post) => {
        post.remove()
    })
}

setInterval(removeCommunityPosts, 500) // Yes, it runs every half second. I'm sorry.