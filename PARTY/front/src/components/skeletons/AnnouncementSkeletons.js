import React from "react"
import {Grid, Skeleton} from "@mui/material"

export const AnnouncementSkeleton = () => {
    return (
        <Grid container>
                {Array.from(new Array(3)).map((value, index) => {
                    return <Grid key={index} item margin={2}>
                        <Skeleton variant="rectangular" width={310} height={218}/>
                        <Skeleton variant="text" width={310}/>
                        <Skeleton variant="text" width={310}/>
                        <Skeleton variant="text" width={310}/>
                    </Grid>
                })}
        </Grid>
    )
}