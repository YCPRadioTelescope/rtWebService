const app = require('../index.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
var config = require('../config.json');

describe('get Endpoints', () => {
    it('should test that true === true', async done => {
      expect(true).toBe(true)
      done()
    });

  it('gets the test endpoint', async done => {
    const response = await request.get('/test')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
  })
});

///if not working, check rds inbound rules
describe('post Endpoints', () => {
  it('post to pending users', async done => {
    const response = await request.post('/pendingUsers').send({
      UUID: config.UUID
    });

    expect(response.status).toBe(200);
    done()
  });
  it('post to all users', async done => {
    const response = await request.post('/users').send({
      UUID: config.UUID
    });

    expect(response.status).toBe(200);
    done()
  });
  it('post to approve user', async done => {
    const response = await request.post('/approveUser').send({
      UUID: config.UUID,
      id: 1
    });

    expect(response.status).toBe(200);
    done()
  });
  it('post to deny user', async done => {
    const response = await request.post('/denyUser').send({
      UUID: config.UUID,
      id: 1
    });

    expect(response.status).toBe(200);
    done()
  });
  //// commented bc actually creates a user.....
  /*it('post to create inactive user', async done => {
    const response = await request.post('/createInactiveUser').send({
      UUID: config.UUID,
      first_name: "string",
      last_name: "string",
      email_address: "7@7.com"
    });

    expect(response.status).toBe(200);
    done()
  });*/
  it('post to delete user', async done => {
    const response = await request.post('/deleteUser').send({
      UUID: config.UUID,
      id: 1
    });

    expect(response.status).toBe(200);
    done()
  });
  it('post to email', async done => {
    const response = await request.post('/email').send({
      UUID: config.UUID,
      destination: "enardo@ycp.edu",
      message: "string",
      subject : "string"
    });

    expect(response.status).toBe(200);
    done()
  })
});

describe('post Endpoint w/o proper credentials', () => {
  it('post to pending users', async done => {
    const response = await request.post('/pendingUsers').send({
      UUID: "someBadString"
    });

    expect(response.status).toBe(403);
    done()
  });
  it('post to all users', async done => {
    const response = await request.post('/users').send({
      UUID: "someBadString"
    });

    expect(response.status).toBe(403);
    done()
  });
  it('post to approve user', async done => {
    const response = await request.post('/approveUser').send({
      UUID: "someBadString",
      id: 1
    });

    expect(response.status).toBe(403);
    done()
  });
  it('post to deny user', async done => {
    const response = await request.post('/denyUser').send({
      UUID: "someBadString",
      id: 1
    });

    expect(response.status).toBe(403);
    done()
  });
  it('post to delete user', async done => {
    const response = await request.post('/deleteUser').send({
      UUID: "someBadString",
      id: 1
    });

    expect(response.status).toBe(403);
    done()
  });
  it('post to email', async done => {
    const response = await request.post('/email').send({
      UUID: "someBadString",
      destination: "enardo@ycp.edu",
      message: "string",
      subject : "string"
    });

    expect(response.status).toBe(403);
    done()
  })
});

describe('post Endpoint w/o proper params', () => {
  it('post to approve user', async done => {
    const response = await request.post('/approveUser').send({
      UUID: config.UUID,
      someBadParam: 1
    });

    expect(response.status).toBe(401);
    done()
  });
  it('post to deny user', async done => {
    const response = await request.post('/denyUser').send({
      UUID: config.UUID,
      someBadParam: 1
    });

    expect(response.status).toBe(401);
    done()
  });
  it('post to delete user', async done => {
    const response = await request.post('/deleteUser').send({
      UUID: config.UUID,
      someBadParam: 1
    });

    expect(response.status).toBe(401);
    done()
  });
  it('post to email', async done => {
    const response = await request.post('/email').send({
      UUID: config.UUID,
      someBadParam: "enardo@ycp.edu",
      message: "string",
      subject : "string"
    });

    expect(response.status).toBe(401);
    done()
  })
});
