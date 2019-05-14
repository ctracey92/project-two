const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = function (app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/signin');
  }

  // auth routes...
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup/fail'
  }))

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
  }))

  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    })
  })

  app.get('/signin/:fail?', (req, res) => {
    res.render('sign-in');
  })

  app.get('/signup/:fail?', (req, res) => {
    res.render('sign-up');
  })

  // page routes
  app.get('/', isLoggedIn, (req, res) => {
    const obj = {};
    obj.isAdmin = false;
    obj.user = req.user;
    obj.users = null;
    obj.projects = null;

    function sendResponse() {
      if (obj.users !== null && obj.projects !== null) {
        res.render("projects", obj)
      }
    }

    db.User.findAll({}).then((result) => {
      obj.users = result;
      const userProf = obj.users.find(u => u.id === req.user.id)
      obj.isAdmin = (userProf.dataValues.UserRoleId === 1) ? true : false
      findProjects();
    })

    const findProjects = () => {

      if (obj.isAdmin) {
        db.Project.findAll({
          include: [ db.Task ]
        }).then((result) => {
          obj.projects = result;
          sendResponse();
        })
      } else {
        db.Project.findAll({
          where: {
            UserId: req.user.id
          },
          include: [ db.Task ]
        }).then((result) => {
          obj.projects = result;
          sendResponse();
        })

      }

    }

  })


  app.get('/projects', isLoggedIn, (req, res) => {
    const obj = {};
    obj.isAdmin = false;
    obj.user = req.user;
    obj.users = null;
    obj.projects = null;

    function sendResponse() {
      if (obj.users !== null && obj.projects !== null) {
        res.render("projects", obj)
      }
    }

    db.User.findAll({}).then((result) => {
      obj.users = result;
      const userProf = obj.users.find(u => u.id === req.user.id);
      obj.isAdmin = (userProf.dataValues.UserRoleId === 1) ? true : false;
      findProjects();
    })

    const findProjects = () => {

      if (obj.isAdmin) {
        db.Project.findAll({
          include: [ db.Task ]
        }).then((result) => {
          obj.projects = result;
          sendResponse();
        })
      } else {
        db.Project.findAll({
          where: {
            UserId: req.user.id
          },
          include: [ db.Task ]
        }).then((result) => {
          obj.projects = result;
          sendResponse();
        })
      }
    }

  })

  app.get('/project/:id/:taskId?', isLoggedIn, (req, res) => {

    if (req.params.id === undefined) {
      res.redirect('/projects');
    } else {
      const obj = {};
      obj.isAdmin = false;
      obj.user = req.user;
      obj.users = null;
      obj.project = null;
      obj.activeTask = null;
      obj.statuses = null;

      function sendResponse() {
        if (obj.users !== null && obj.project !== null && obj.activeTask !== null && obj.statuses !== null) {
          res.render('project-page', obj)
        }
      }

      db.User.findAll({}).then((result) => {
        obj.users = result;
        const userProf = obj.users.find(u => u.id === req.user.id);
        obj.isAdmin = (userProf.dataValues.UserRoleId === 1) ? true : false;
        sendResponse();
      })

      db.TaskStatus.findAll({}).then((result) => {
        obj.statuses = result;
        sendResponse();
      })

      db.Project.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Task]
      }).then((result) => {
        obj.project = result
        sendResponse();
      })

      if (req.params.taskId !== undefined) {
        db.Task.findOne({
          where: {
            id: req.params.taskId
          },
          include: [db.Comment]
        }).then((result) => {
          obj.activeTask = result;
          sendResponse()
        })
      } else {
        obj.activeTask = false;
      }

    }

  })

  app.get('/tasks', isLoggedIn, (req, res) => {
    const obj = {};
    obj.isAdmin = false;
    obj.user = req.user;
    obj.users = null;
    obj.tasks = null;

    function sendResponse() {
      if (obj.users !== null && obj.tasks !== null) {
        res.render("tasks", obj)
      }
    }

    db.User.findAll({}).then((result) => {
      obj.users = result;
      const userProf = obj.users.find(u => u.id === req.user.id);
      obj.isAdmin = (userProf.dataValues.UserRoleId === 1) ? true : false;
      sendResponse();
    })

    db.Task.findAll({
      where: {
        UserId: req.user.id,
        TaskStatusId: { 
          [Op.not]: 3 
        }
      },
      include: [db.Project]
    }).then((result) => {
      obj.tasks = result;
      sendResponse();
    })

  })


  app.get('/team', isLoggedIn, (req, res) => {
    const obj = {};
    obj.isAdmin = true;
    obj.user = req.user;

    db.User.findAll({}).then((result) => {
      obj.users = result;
      const userProf = obj.users.find(u => u.id === req.user.id);
      obj.isAdmin = (userProf.dataValues.UserRoleId === 1) ? true : false;
      res.render("team", obj);
    })

  })
  
  app.get('*', isLoggedIn, (req, res) => {

    res.render("404");

  })
};
