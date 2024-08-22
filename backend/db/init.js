//
//
const bcrypt = require('bcrypt')
const { MongoClient } = require('mongodb')

const CF = require('../conf/conf_app')


const client = new MongoClient(CF.mongoose.url)
console.log('db:init .. connect to mongodb ' + CF.mongoose.url)

async function insert_categories(client, dbase, collection, src) {
    try {
        const database = client.db(dbase)
        const obj = database.collection(collection)

        for (let i=0; i < src.length; i++) {
            let obj_exist = await obj.findOne({ name: src[i] })
            if (obj_exist)
                await obj.deleteOne({  name: src[i] })

            const result = await obj.insertOne({ ...src[i] })

            console.log(i + ' .. a doc inserted _id : ' + result.insertedId)
        }

    } catch(err) {
        console.log(err)
        // await client.close()
    } finally {
        // await client.close()
    }
}


let dbase = 'linxedu'
let collection = 'categories'

let src = [
    {
        "name": "AI",
        "description": "Artificial Intelligence",
        "courses": []
    },
    {
        "name": "CyberSecurity",
        "description": "cyber security",
        "courses": []
    },
    {
        "name": "ChatGPT",
        "description": "LLM Large Langeuage Model",
        "courses": []
    }
]

insert_categories(client, dbase, collection, src).catch(console.dir)


async function insert_admin(client, dbase, coll_user, coll_profile, src) {
    console.log(src)
    try {
        const database = client.db(dbase)

        let obj_profile = database.collection(coll_profile)
        const resProfile = await obj_profile.insertOne({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        console.log(' .. a doc inserted _id : ' + resProfile.insertedId)

        let obj = database.collection(coll_user)
        let user_exist = await obj.findOne({ email: src['email'] })
        if (user_exist)
            await obj.deleteOne({ email: src['email'] })

        // hash - secure passoword
        console.log(src['email'])
        let hashedPassword = await bcrypt.hash(src['password'], 10)

        const result = await obj.insertOne({
            firstName: src['firstName'],
            lastName: src['lastName'],
            email: src['email'],
            password: hashedPassword,
            accountType:  src['accountType'],
            additionalDetails: resProfile._id,
            // approved: approved,
            approved: true,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${ src['firstName']} ${src['lastName']}`
         })

        console.log(' .. a doc inserted _id : ' + result.insertedId)


    } catch(err) {
        console.log(err)
        await client.close()
    } finally {
        await client.close()
    }
}

let user = {
    "firstName": "admin101",
    "lastName": "admin",
    "email": "admin101@mail.com",
    "password": "admin101",
    "accountType": "Admin",
    "active": true,
    "approved": true
}

insert_admin(client, dbase, 'users', 'profiles', user).catch(console.dir)
