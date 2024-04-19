interface ResizePrams {
  w: number | undefined;
  h: number | undefined;
  q: number | undefined;
}

interface RequestQuery {
  w: number;
  h: number;
  q: number;
  url: string;
}
type LambdaEventType = {
  Records: {
    cf: {
      request: {
        querystring: string;
        uri: string;
        origin: { s3: { domainName: string } };
      };
      response: {
        status: number;
        body: any;
        bodyEncoding: string;
        headers: any;
      };
    };
  }[];
};

// {
//   "Records": [
//       {
//           "cf": {
//               "config": {
//                   "distributionDomainName": "d21uvjhtq1g90e.cloudfront.net",
//                   "distributionId": "EAD2S1KBV8KV1",
//                   "eventType": "origin-response",
//                   "requestId": "mE1W_OnUI_QUrlanZwJolpVGuv9P7ypCZ8AZhmgKR93Hwfja82b7qQ=="
//               },
//               "request": {
//                   "clientIp": "220.116.47.227",
//                   "headers": {
//                       "host": [
//                           {
//                               "key": "Host",
//                               "value": "enkor-fip-test.s3.ap-northeast-2.amazonaws.com"
//                           }
//                       ],
//                       "x-forwarded-for": [
//                           {
//                               "key": "X-Forwarded-For",
//                               "value": "220.116.47.227"
//                           }
//                       ],
//                       "user-agent": [
//                           {
//                               "key": "User-Agent",
//                               "value": "Amazon CloudFront"
//                           }
//                       ],
//                       "via": [
//                           {
//                               "key": "Via",
//                               "value": "2.0 f192ae96aecb34ea7c9905f8f9f23272.cloudfront.net (CloudFront)"
//                           }
//                       ],
//                       "accept-encoding": [
//                           {
//                               "key": "Accept-Encoding",
//                               "value": "br,gzip"
//                           }
//                       ]
//                   },
//                   "method": "GET",
//                   "origin": {
//                       "s3": {
//                           "authMethod": "none",
//                           "customHeaders": {},
//                           "domainName": "enkor-fip-test.s3.ap-northeast-2.amazonaws.com",
//                           "path": ""
//                       }
//                   },
//                   "querystring": "",
//                   "uri": "/favicon.ico"
//               },
//               "response": {
//                   "headers": {
//                       "x-amz-request-id": [
//                           {
//                               "key": "x-amz-request-id",
//                               "value": "DYHWNRK5GBK86KM4"
//                           }
//                       ],
//                       "x-amz-id-2": [
//                           {
//                               "key": "x-amz-id-2",
//                               "value": "MhRfQYJdd83Nq5A+j198qWJMk+CE3Qt7wR8lIJr0keTTPm2OGrUe2wa29an7/G/MD99t8FrlL7o="
//                           }
//                       ],
//                       "date": [
//                           {
//                               "key": "Date",
//                               "value": "Wed, 17 Apr 2024 07:30:09 GMT"
//                           }
//                       ],
//                       "server": [
//                           {
//                               "key": "Server",
//                               "value": "AmazonS3"
//                           }
//                       ],
//                       "content-type": [
//                           {
//                               "key": "Content-Type",
//                               "value": "application/xml"
//                           }
//                       ],
//                       "transfer-encoding": [
//                           {
//                               "key": "Transfer-Encoding",
//                               "value": "chunked"
//                           }
//                       ]
//                   },
//                   "status": "403",
//                   "statusDescription": "Forbidden"
//               }
//           }
//       }
//   ]
// }
