import React, {useRef} from "react";

function ForbiddenPage(){
    return(
        <div>
            <h1>You have no access to this page</h1>
            <a href="/admin">Click here</a>
        </div>
    );
}

export default ForbiddenPage;