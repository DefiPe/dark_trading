import styles from "@/styles/tokenStatusBar.module.css";
import { useState } from "react";

function ReadMore({ data }) {
    const [readMore, setReadMore] = useState(false);
    return (

        <>

            <p className={styles.tokenDes}>
                {data?.split(" ").splice(0,
                    (readMore ? data?.trim().split(/\s+/).length : 50)
                ).join(" ")}
                {
                    (data?.trim().split(/\s+/).length > 50 ? <span onClick={() => setReadMore(!readMore)} className={styles.readMoreButton}>{(!readMore) ? " Read More" : " Read Less"} </span> : <></>)
                }

            </p>

        </>


    );
}

export default ReadMore;