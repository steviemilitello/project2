//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// DEPENDENCIES //////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mongoose = require('./connection')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// IMPORT MODELS /////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import user model for populate
const User = require('./games')

// import comment schema
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// GAMES SCHEMA //////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gamesSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
        img: { type: String },
        system: { type: String, required: true },
        genres: [ String ],
        creators: [ String ],
        publishers: [ String ],
		gametypes: [ String ],
		booktypes: [ String ],
		seeddata: { type: Boolean, default: false },
        players: { type: Number },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema]
	},
	{ timestamps: true }
)

const Game = model('Game', gamesSchema)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// EXPORT MODEL //////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = Game