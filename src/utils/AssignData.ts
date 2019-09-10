interface defaultIndexer {[ key: string ]: any;}

export default <ClassProps, DataProps>(
    $this: ClassProps&defaultIndexer,
    $data: DataProps&defaultIndexer,
    showLogs: boolean = false,
):ClassProps => {
    const dataKeys = Object.keys($data);

    for (const key of dataKeys) {
        if ($this[ key ] && typeof $this[key] !== 'function') {
            if ($this[ key ] !== $data[ key ]) {
                Object.assign($this, { [ key ]: $data[ key ] });
                if(showLogs) console.log(`Property [ ${ key } ] assigned value :: `, $data[key]);
            }
            else {
                if(showLogs) console.log(`Property [ ${ key } ]'s values equal`);
            }
        }
        else {
            Object.assign($this, { [ key ]: $data[ key ] });
            if(showLogs) console.log(`Property [ ${ key } ] missing | added property`);
        }
    }

    if(showLogs) console.log('assignData result :: ', $this);

    return $this;
};
