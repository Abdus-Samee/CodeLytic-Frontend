import { Skeleton, } from "@mui/material"

const PostSkeleton = () => {
    return (
        <>
            <h1 style={{ marginBottom: '1vh', }}><Skeleton animation="wave" width="30%" sx={{ bgcolor: '#333440' }} /></h1>
            <div key={index} style={{ display: 'flex', flexDirection: 'column', padding:'2rem', marginBottom: '1vh', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Skeleton animation="wave" width="70%" sx={{ bgcolor: '#333440' }} />
                    <Skeleton animation="wave" width="20%" sx={{ bgcolor: '#333440' }} />
                </div>
                <p style={{ marginBottom: '0.5vh', }}><Skeleton animation="wave" width="40%" sx={{ bgcolor: '#333440' }} /></p>
                <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                    <span><Skeleton animation="wave" variant="rectangular" width={50} height={20} sx={{ borderRadius: '2rem', bgcolor: '#333440' }} /></span>
                    <span><Skeleton animation="wave" variant="rectangular" width={50} height={20} sx={{ borderRadius: '2rem', bgcolor: '#333440' }} /></span>
                    <span><Skeleton animation="wave" variant="rectangular" width={50} height={20} sx={{ borderRadius: '2rem', bgcolor: '#333440' }} /></span>
                </div>
            </div>
        </>
    )
}

export default PostSkeleton