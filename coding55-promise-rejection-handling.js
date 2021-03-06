// What if something went wrong in one of the steps of the Promise chain?

// Let's the see:
// step 1:
request("http://some.url.1/")
    // step 2:
    .then(function (response1) {
        foo.bar(); // undefined, error!
        // never gets here
        return request("http://some.url.2/?v=" + response1);
    })
    // step 3:
    .then(
        function fulfilled(response2) {
            // never gets here
        },
        // rejection handler to catch the error
        function rejected(err) {
            console.log(err);
            // `ReferenceError` from `foo.bar()` error
            return 42;
        }
    )
    // step 4:
    .then(function (msg) {
        console.log(msg);
        // 42
    });

/*
When the error occurs in step 2, the rejection handler in step 3 catches it.
The return value (42 in this snippet), if any, from that rejection handler fulfills
the promise for the next step (4), such that the chain is now back in a fulfillment state.
*/

