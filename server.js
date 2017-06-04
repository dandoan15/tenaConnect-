//TenaConnect Server
//Authors: Joseph Janecek, Dan Doan, Alan Yu
//Version 5
//June 6, 2016


var express = require('express');
var url = require('url');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();

// facebook login
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//For file uploading
var fs = require('fs');

var multer = require('multer');

//This function allows the post to determine the folder to store/get the files from based on the user name
var uploadTo = function (dest)
{
    var storage = multer.diskStorage({
        destination: function (req, file, cb)
        {
            var folderTo = './public/uploads/' + dest + '/';
            if (!fs.existsSync(folderTo))
            {
                fs.mkdirSync(folderTo);
            }
            cb(null, './public/uploads/' + dest + '/')
        },
        filename: function (req, file, cb)
        {
            cb(null, file.originalname)
        }
    });

    //var upload = multer({ storage: storage });
    var upload = multer({ storage: storage }).single('file');
    //Return the uploaded file
    return upload;
}

//Schema Variables
var TenantLists;
var LandlordInfo;
var PaymentInfo;
var tenantMessage;
var categories;
var accounts;
//For getting user info
var userProf;

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.tenaConnectCloudSample.config');

console.log(mongoDBConnection.uri);

mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function ()
{
    var Schema = mongoose.Schema;
    
    //Schema for Tenant Info
	var TenantInfoSchema = new Schema( 
		{
            Room: Number,
            TenantID: String,
            LandlordID: String,
            FName: String,
            LName: String,
            PhoneNum: String,
            Email: String
		},
	   {collection: 'tenantInfo'}
	);
    TenantLists = mongoose.model('TenantLists', TenantInfoSchema);

    //Schema for tenant payment Info
    var TenantPaymentSchema = new Schema(
        {
            TenantID: String,
            Rent: Number,
            Utilities: Number,
            LateFee: Number,
            gracePeriod: Number,
            Payment: [{
                PaymentID: String,
                Amount: Number,
                Description: String,
                dueDate: Date,
                lastDay: Date
            }]
        },
        { collection: 'tenantDues' }
    );
    PaymentInfo = mongoose.model('PaymentInfo', TenantPaymentSchema);

    //Schema for Landlord Info
    var LandlordInfoSchema = new Schema(
        {
            LandlordID: Number,
            FName: String,
            LName: String,
            PhoneNum: String,
            Email: String,
            BuildingName: String,
            NumTenants: Number
        }, { collection: 'LandlordInfo' }
    );
    LandlordInfo = mongoose.model("LandlordInfo", LandlordInfoSchema);
 
    //creating a schema for tenant messages to be access by the landlord
    var tenantMessageSchema = new Schema(
        {
            MessageID: String,
            Category: String,
            Subject: String,
            Date: String,
            Time: String,
            From: String,
            To: String,
            Message: String,
            Reply: String
        }, { collection: 'tenantMessages' }
    );
    tenantMessage = mongoose.model("tenantMessage", tenantMessageSchema);

    //Schema for categories
    var categoriesSchema = new Schema(
        {
            Category: String
        }, { collection: 'messageCategories' }
    );

    categories = mongoose.model("messageCategories", categoriesSchema);

    var accountSchema = new Schema(
    {
        FacebookID: String,
        FirstName: String,
        Email: String
    }, { collection: 'accounts' }
    );

    accounts = mongoose.model("accounts", accountSchema);

	console.log('models have been created');
});

//-------------------------------------------------------------------------------- Facebook login --------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

/* 
    Passport session setup.
      To support persistent login sessions, Passport needs to be able to
      serialize users into and deserialize users out of the session.  Typically,
      this will be as simple as storing the user ID when serializing, and finding
      the user by ID when deserializing.  However, since this example does not
      have a database of user records, the complete Windows Live profile is
      serialized and deserialized.
*/
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
//Deploy on azure
var FACEBOOK_APP_ID = 1614372645557448;
var FACEBOOK_APP_SECRET = "45dab597ee71d3396c1307fd4004bd04";

//Local stuff
// var FACEBOOK_APP_ID = 1594225920889484;
// var FACEBOOK_APP_SECRET = "e582a537f6c22fc2740c2fdbc97cfa05";

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://tenaconnect.azurewebsites.net/auth/facebook/callback",
   // callbackURL: "http://me.localtest.me:80/auth/facebook/callback",
    profileFields: ['id', 'emails', 'displayName']
},
    function (accessToken, refreshToken, profile, done) 
    {
        accounts.findOne({ Email: profile.emails[0].value }, function (err, user) 
        {
            if (err) 
            {
                return done(err);
            }
            else 
            {
                if (user)
                {
                    console.log("User: " + profile.displayName + " found and logged in!");
                    userProf = user;
                    done(null, user);
                }
                else
                {
                    accounts.create([{ FacebookId: profile.id, FirstName: profile.displayName, Email: profile.emails[0].value }], function (err, newUser) 
                    {
                        if (err) 
                        {
                            console.log('object creation failed');
                            return done(err);
                        }
                        else 
                        {
                            console.log('New user: ' + profile.displayName + ' created and logged in!');
                            userProf = newUser;
                            done(null, newUser);
                        }
                    })
                }
            }
        })
    }
));
/*
// set the view engine to ejs
app.set('views', './public/');
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('index', { user: req.user });
});
*/

/*
    GET /auth/facebook
    Use passport.authenticate() as route middleware to authenticate the request.
    The first step in Facebook authentication will involve redirecting the user 
    to the Facebook.com After authorization, Facebook will redirect to the user 
    back to this application at /auth/facebook/callback
*/
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }),
    function(req, res){
    // The request will be redirected to Facebook for authentication, so
    // this function will not be called.
  });
/*
    GET /auth/facebook/callback
    Use passport.authenticate() as route middleware to authenticate the request.
    If authentication fails, the user will be redirected back to the login page.
    Otherwise, the primary route function function will be called, which, in this
    example, will redirect the user to the home page.
*/
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect:'/homeButtons.html', failureRedirect: '/'}))

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/signup', function (req, res) {
    res.render('signup');
});


/*
   Simple route middleware to ensure user is authenticated.
   Use this route middleware on any resource that needs to be protected.  If
   the request is authenticated (typically via a persistent login session),
   the request will proceed.  Otherwise, the user will be redirected to the
   login page.
*/
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get("/user", function (req, res)
{
    console.log("Getting user")
    res.send(userProf);
})

//-------------------------------------------------------------------------------- Tenant Directory Code --------------------------------------------------------------------------------------
function getAllTenants(req, res)
{
    var query = TenantLists.where({});
    query.exec(function(err, itemArray)
    {
        if (err)
            console.log("An error occured: ", err);
        else
        {
            console.log("About to send data")
            res.send(itemArray);
        }
    })
}

function getTenantInfo(res, query)
{
    var search = TenantLists.where(query);
    search.exec(function(err, info)
    {
        if (err)
            console.log("An error occured: ", err);
        else
        {
            res.send(info);
        }
    })
}

var createID = function generateUniqueID(IDsize)
{
    var newID = Math.floor(1 + (Math.random() * 1000000)).toString();
    while (newID.length < IDsize)
    {
        newID = '0' + newID;
    }
    return newID;
}

app.use('/', express.static('./public/'));

//Here are the routes go
app.get('/listTenants/', function (req, res)
{
    console.log("Getting list of tenants")
    getAllTenants(req, res);
});

app.get('/listTenants/:tenantID', function (req, res)
{
    var id = req.params.tenantID;
    console.log("Getting tenant info of tenant: " + id);
    getTenantInfo(res, { TenantID: id });
});

app.get('/listTenants/:LName/:FName', function (req, res) {
    var last = req.params.LName;
    var first = req.params.FName;
    console.log("Getting tenant info of tenant: " + last + first);
    getTenantInfo(res, { LName: last, FName: first });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/addTenants', function (req, res)
{
    console.log("Posting data");
    var ID = createID(7);
    ID = 'T' + ID;
    console.log("newID " + ID);
    TenantLists.create({
        Room: parseInt(req.body.tenantInfo.Room), TenantID: ID, LandlordID: req.body.LandlordID, FName: req.body.tenantInfo.FName, LName: req.body.tenantInfo.LName,
        PhoneNum: req.body.tenantInfo.PhoneNum, Email: req.body.tenantInfo.Email },
    function (err)
    {
        if (err)
        {
            console.log('object creation failed');
        }
    });

    PaymentInfo.create({
        TenantID: ID, Rent: req.body.PaymentInfo.Rent, Utilities: req.body.PaymentInfo.Utilities, LateFee: req.body.PaymentInfo.LateFee,
        gracePeriod: req.body.PaymentInfo.gracePeriod, Payment: []},
    function (err, newEntry)
    {
        if (err)
        {
            console.log('object update failed');
        }
        else
        {
            //console.log(newEntry);
            res.send();
        }
    });

});

app.put('/listTenants/:tenantID', function (req, res)
{
    var id = req.body[0].TenantID;
    var update = { FName: req.body[0].FName, LName: req.body[0].LName, PhoneNum: req.body[0].PhoneNum, Email: req.body[0].Email };
    console.log("updating info for tenantID: " + id);
    TenantLists.findOneAndUpdate({ TenantID: id }, update, { new: true }, function (err, numChanged)
    {
        if (err)
        {
            console.log('object update failed');
        }
        else
        {
            //console.log(numChanged);
            res.send();
        }
    });
});

app.post('/deleteTenants', function (req, res)
{
    var done = false;
    var ID = req.body.tenantID;
    var filePath = "public/uploads/" + ID + '/';
    console.log("Deleting tenant with ID " + ID);
    TenantLists.findOneAndRemove({ TenantID: ID }, function (err)
    {
        if (err)
        {
            console.log("An error occured: ", err);
        }
        else
        {
            //res.send();
        }
    });

    PaymentInfo.findOneAndRemove({ TenantID: ID }, function (err)
    {
        if (err)
        {
            console.log("An error occured: ", err);
        }
        else
        {
            //res.send();
        }
    });

    //Check if the directoy exists
    if (!fs.existsSync(filePath))
    {
        //If not report to user
        console.log("File does not exist");
        res.send();
    }
    //If so...
    else
    {
        //Read all files in directory and delete/remove them
        fs.readdir(filePath, function (err, files)
        {
            if (err)
            {
                console.log(err);
            }
            files.forEach(function (file)
            {
                var curPath = filePath + file;
                console.log("File Path: " + curPath);
                fs.unlink(curPath, function (err)
                {
                    if (err)
                    {
                        console.log(err);
                    }
                });
            })
        });

        res.send(filePath);
    }

});

//Finaly delete the directory of the tenant we deleted
app.post('/rmDir', function (req, res)
{
    var filePath = req.body.path;
    fs.rmdir(filePath, function (err)
    {
        if (err)
        {
            console.log(err);
        }
        res.send("Delete Successful");
    });
});


//--------------------------------------------------------------------------------------- Message Box Code --------------------------------------------------------------------------------------
function getTenantMessage(req, res)
{
    var search = tenantMessage.where({});
    search.exec(function (err, itemArray)
    {
        if (err)
        {
            console.log("An error occurred: ", err);
        }
        else
        {
            //console.log(itemArray);
            res.send(itemArray);
        }
    })
}

//get a specific tenant Message
function getTenantMessage2(res, query)
{
    var search = tenantMessage.where(query);
    search.exec(function (err, itemArray)
    {
        if (err)
        {
            console.log("An error occurred: ", err);
        }
        else
        {
            console.log("Getting the message you selected");
            //console.log(itemArray);
            res.send(itemArray);
        }
    })
}

function getCategories(req, res)
{
    var search = categories.where({});
    search.exec(function (err, itemArray)
    {
        if (err)
        {
            console.log("An error occurred: ", err);
        }
        else
        {
            //console.log(itemArray);
            res.send(itemArray);
        }
    })
}

/* A function to call the search for the tenant message to extract the message store into a variable first. Then
    call the findOneAndUpdate to add the reply message on top of the original message of the tenant.
    mongoose API parameters
        query = query the object with a JSON format
        update = attributeName: change to w/e
        options = {new:true} allows it to be view within console for immediately update/change*/
function addMessageReply(res, message, to, query)
{
    var newMessage = "RE: " + message.Reply;
    var update = { Reply: newMessage, From: to, To: query.From };
    var options = { new: true };

    tenantMessage.findOneAndUpdate(query, update, options, function (err, person)
    {
        if (err)
        {
            console.log("An error occured: ", err);
        }
        else
        {
            //console.log(person);
        }
    }) 
}

app.get('/directory/allmessages/:To', function (req, res)
{
    var query = { To: req.params.To };
    console.log("Getting all tenant messages!");
    getTenantMessage2(res, query);
});

app.get('/directory/allmessages/:messageID/:From', function (req, res)
{
    //var LName = req.params.LName;
    //var FName = req.params.FName;
    var messageID = req.params.messageID;
    var fromID = req.params.From;
    console.log("Getting a specific tenant's message!");
    getTenantMessage2(res, { MessageID: messageID, From: fromID });
});

app.get('/categories', function (req, res)
{
    console.log("Getting all categories to load for drop down!");
    getCategories(req, res);
});

   //A post to for a to sent a message. 
app.post("/tenantMessage", jsonParser, function (req, res)
{
    console.log('receiving tenant message!');
    var ID = createID(10);
    var addInfo = { Category: req.body.Category, Subject: req.body.Subject, Date: req.body.Date, Time: req.body.Time, From: req.body.From,
        To: req.body.To, Message: req.body.Message, MessageID: ID, Reply: '' };

    console.log(addInfo);
    tenantMessage.create([addInfo], function (err, message)
    {
        if (err)
        {
            console.log('object creation failed');
        }
        //console.log(message);
        res.send(message);

    })
    //res.send("Success!");
});


/*
    There are multiple params due to the TenaConnectServer angularjs put from $stateParams.Date 
    has include the "/" within the date format(mm/dd/yyyy).
*/
app.put("/reply/:messageID/:From", function (req, res)
{
    var messageID = req.params.messageID;
    var From = req.params.From;
    var message = { Reply: req.body.reply };
    var to = req.body.To;

    addMessageReply(res, message, to, { MessageID: messageID, From: From });
    res.send("Success");
})

app.delete('/directory/allmessages/:messageID/:From', function (req, res)
{
    //var LName = req.params.LName;
    //var FName = req.params.FName;
    var messageID = req.params.messageID;
    var fromID = req.params.From;
    console.log("Deleting Message");
    tenantMessage.findOneAndRemove({ MessageID: messageID, From: fromID }, function (err)
    {
        if (err)
        {
            console.log("An error occured: ", err);
        }
        else
        {
            //console.log(person);
            res.send();
        }
    });
    
});

//----------------------------------------------------------------------------- Payment Manager Code -------------------------------------------------------------------------------------------
function getPayingInfo(res, query)
{
    var search = PaymentInfo.where(query);
    search.exec(function (err, info)
    {
        if (err)
            console.log("An error occured: ", err);
        else
        {
            res.send(info);
        }
    })
}

function addPayment(res, query, data)
{
    var payments;
    var search = PaymentInfo.where(query);
    search.exec(function (err, info)
    {
        if (err)
            console.log("An error occured: ", err);
        else
        {
            payments = info.Payment;
            payments.push(data);
            res.send();
        }
    })
   
}

/*app.get('/paymentInfo/', function (req, res)
{
    console.log("Getting list of tenants")
    getAllTenants(req, res);
});*/

app.get('/paymentInfo/', function (req, res)
{
    console.log("Getting list of tenant Payment Info");
    getPayingInfo(res, {});
});

app.get('/paymentInfo/:tenantID', function (req, res)
{
    var id = req.params.tenantID;
    console.log("Getting Payment info of tenant: " + id);
    getPayingInfo(res, { TenantID: id });
});

app.put('/addPayment/:tenantID', function (req, res)
{
    var id = req.params.tenantID;
    console.log("Adding payment to tenant: " + id);
    var query = { TenantID: id };
    var data = req.body;
    PaymentInfo.findOneAndUpdate(query, { $push: { Payment: { PaymentID: data.PaymentID, Amount: data.Amount, Description: data.Description, dueDate: data.dueDate, lastDay: data.lastDay } } }, { new: true }, function (err, newEntry)
    {
        if (err)
        {
            console.log('object update failed');
        }
        else
        {
            //console.log(newEntry);
            res.send();
        }
    });

    //addPayment(res, query, data);


});

app.put('/paymentInfo/:tenantID', function (req, res)
{
    var id = req.body[0].TenantID;
    var update = { Rent: req.body[0].Rent, Utilities: req.body[0].Utilities, LateFee: req.body[0].LateFee, gracePeriod: req.body[0].gracePeriod };
    console.log("updating payment info for tenantID: " + id);
    //console.log(update);
    PaymentInfo.findOneAndUpdate({ TenantID: id }, update, { new: true }, function (err, newEntry)
    {
        if (err)
        {
            console.log('object update failed');
        }
        else
        {
            //console.log(newEntry);
            res.send();
        }
    });
});

app.put('/deletePayment/:tenantID', function (req, res)
{
    var tenantID = req.body.TenantID;
    var paymentID = req.body.PaymentID;
    console.log("Deleting payment info for tenantID: " + tenantID);
    PaymentInfo.findOneAndUpdate({ TenantID: tenantID }, { $pull: { Payment: { PaymentID: paymentID } } }, { new: true }, function (err, entry)
    {
        if (err)
        {
            console.log('object update failed');
        }
        else
        {
            //console.log(entry);
            res.send();
        }
    });
});

//-------------------------------------------------------------- File System -------------------------------------------------------------------------------
fs.realpath("public/uploads/", function (err, path)
{
    if (err)
    {
        console.log(err);
    }
    console.log('Path is: ' + path);
});

app.get('/allFiles/:tenantID', function (req, res)
{
    var id = req.params.tenantID;
    console.log("GET ALL FILES in " + id + "!");
    var path = "public/uploads/" + id + '/';
    if (!fs.existsSync(path))
    {
        fs.mkdirSync(path);
    }
    var list = [];
    fs.readdir(path, function (err, files)
    {
        if (err)
        {
            console.log(err);
        }
        files.forEach(function (file)
        {
            //console.log('Files: ' + file);
            list.push({ "fileName": file });
        })
        res.json(list);
    });
});

//File upload post route
app.post('/addFileTo/:tenantID', function (req, res)
{
    var id = req.params.tenantID;
    var addFile = uploadTo(id);
    addFile(req, res, function (err)
    {
        if (err)
            console.log(err);
        res.send("Success");
    });
    
});

//Delete Files
app.post('/deleteFile', function (req, res)
{
    var id = req.body.TenantID;
    var fileName = req.body.fileName;
    console.log("Deleteing file in " + id + " Named: " + fileName);
    var path = "public/uploads/" + id + '/' + fileName;
    if (!fs.existsSync(path))
    {
        console.log("File does not exist");
        res.send();
    }
    else
    {
        fs.unlink(path, function (err)
        {
            if (err)
            {
                console.log(err);
            }
            res.send("Delete Successful");
        });
    }
});


//var port = 80;
var port;

if (process.env.port)
{
    port = process.env.port;
}
else
{
    port = 80;
}

app.listen(port);