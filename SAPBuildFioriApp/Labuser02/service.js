const cds = require("@sap/cds")

class quickOrderDisplaySrv extends cds.ApplicationService {
  init() {

       //
    this.on("READ", "SalesOrder", async (req) => {
    const externalService = await cds.connect.to('S4HANADEV');

  // Check if the request query has a SELECT object
  if (req.query && req.query.SELECT) {
    // Modify the query to sort by CreationDate in descending order
    req.query.SELECT.orderBy = [{ ref: ['CreationDate'], sort: 'desc' }];
    
    // Limit the results to the top 300 records
    req.query.SELECT.limit = { rows: { val: 300 } };
  }

  // Execute the modified query on the external service
  return externalService.run(req.query);
    })
 return super.init()
  }
}

module.exports = quickOrderDisplaySrv