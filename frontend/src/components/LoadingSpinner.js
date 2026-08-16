function LoadingSpinner(){

    return(

        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"300px",
        }}>

            <div style={{
                width:"40px",
                height:"40px",
                border:"4px solid #444",
                borderTop:"4px solid #F59E0B",
                borderRadius:"50%",
                animation:"spin 1s linear infinite",
            }}/>

        </div>

    );

}

export default LoadingSpinner;