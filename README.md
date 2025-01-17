# Decho
A simple echo server written in deno.js using Oak

## Running the service:
The server runs in dev and prod mode. In order to run the server in qa mode:

```
deno run dev
```

For prod:
```
 deno run prod
```

If using powershell, you can use `Invoke-WebRequest` to execute an HTTP request. In case of linux, use `curl`.

For Windows:
```
(base) PS C:\Users\ishab> $response = Invoke-WebRequest -Uri 'http://localhost:8080/echo' -Method POST -Headers $headers -ContentType 'application/json' -Body '{
>>   "key": [1, 2, 3, 4, 5, 6]
>> }'
(base) PS C:\Users\ishab> echo $response

StatusCode        : 200
StatusDescription : OK
Content           : {"key":[1,2,3,4,5,6]}
RawContent        : HTTP/1.1 200 OK
                    x-response-time: 1ms
                    Vary: Accept-Encoding
                    Date: Fri, 17 Jan 2025 17:34:02 GMT
                    Content-Type: application/json; charset=UTF-8

                    {"key":[1,2,3,4,5,6]}
Headers           : {[x-response-time, System.String[]], [Vary, System.String[]], [Date, System.String[]],
                    [Content-Type, System.String[]]}
Images            : {}
InputFields       : {}
Links             : {}
RawContentLength  : 21
RelationLink      : {}
```

Set the `showVerbose` parameter to `true` to print the response headers as well along with the content sent as payload:
```
(base) PS C:\Users\ishab> $response = Invoke-WebRequest -Uri 'http://localhost:8080/echo?showVerbose=true' -Method POST -Headers $headers -ContentType 'application/json' -Body '{
>>   "key": [1, 2, 3, 4, 5, 6]
>> }'
(base) PS C:\Users\ishab> echo $response

StatusCode        : 200
StatusDescription : OK
Content           : {"method":"POST","headers":{"accept-encoding":"gzip, deflate, br","content-length":"31","content-ty
                    pe":"application/json","host":"localhost:8080","user-agent":"Mozilla/5.0 (Windows NT 10.0;
                    Microsoft …
RawContent        : HTTP/1.1 200 OK
                    x-response-time: 1ms
                    Vary: Accept-Encoding
                    Date: Fri, 17 Jan 2025 17:34:15 GMT
                    Content-Type: application/json; charset=UTF-8

                    {"method":"POST","headers":{"accept-encoding":"gzip,…
Headers           : {[x-response-time, System.String[]], [Vary, System.String[]], [Date, System.String[]],
                    [Content-Type, System.String[]]}
Images            : {}
InputFields       : {}
Links             : {}
RawContentLength  : 323
RelationLink      : {}
```