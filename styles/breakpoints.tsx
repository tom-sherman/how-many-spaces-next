
type Breakpoints = {
    /**
     * Mobile
     */
    m: string,
    
    /**
     * Tablet small
     */
    ts: string,
    
    /**
     * Tablet large
     */
    tl: string,
    
    /**
     * Desktop Small
     */
    ds: string,

    /**
     * Desktop Large
     */
    dl: string,
    
    /**
     * Desktop Extra Large
     */
    dxl: string,
};

const BreakpointValues: Breakpoints = {
    m: '300px', 
    ts: '560px',
    tl: '768px',
    ds: '980px',
    dl: '1200px',
    dxl: '1400px',
};

export default BreakpointValues;