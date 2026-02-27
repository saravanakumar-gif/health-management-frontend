import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props)
            this.state={hasError:false,error:null};
        };
        static getDerivedStateFromError(error){
            return{hasError:true,error};
        }

        componentDidCatch(error,errorInfo){
            console.error('Error caught by boundary:',error,errorInfo);
        }

        render(){
            if(this.state.hasError){
                return(
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',color:'white',padding:'20px',textAlign:'center'}}>
                        <h1>😔 Oops! Something went wrong</h1>
                        <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
                        <button onClick={()=>window.location.reload()} style={{marginTop:'20px',padding:'12px 24px',background:'white',color:'#667eea', border:'none',borderRadius:'5px',cursor:'pointer',fontWeight:'600'}}>Refresh Page</button>
                    </div>
                );
            }

         return this.props.children;
        }

    }
   
export default ErrorBoundary