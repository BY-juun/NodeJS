const Sequelize = require('sequelize');
const Post = require('./post');
const config = require('../config/config.json')['test'];
const sequelize = new Sequelize(config.database,config.username,config.password,config);

describe('Post 모델',()=>{
    test('static init 메서드 호출',()=>{
        expect(Post.init(sequelize)).toBe(Post);
    })
    
    test('static associate 메서드 호출',()=>{
        const db = {
            User : {
                
            },
            Post : {
                belongsTo : jest.fn(),
                belongsToMany : jest.fn(),
            },
            Hashtag :{
                
            }
        
        }
        Post.associate(db);
        expect(db.Post.belongsTo).toBeCalledWith(db.User);
        expect(db.Post.belongsToMany).toBeCalledTimes(1);
    })
})