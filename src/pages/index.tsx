import React from 'react';
import style from './index.less';
import { Loading } from '@/components/Loading';

class Index extends React.Component {
    componentDidMount() {}

    constructor(props: any) {
        super(props);
    }

    componentWillReceiveProps(nextProps: any) {}

    state = {
        loaded: false,
    };

    render() {
        return (
            <div className={style.root}>
                {this.state.loaded === false && (
                    <div className={style.loading}>
                        <Loading />
                    </div>
                )}

                {this.state.loaded === true && <div></div>}
            </div>
        );
    }
}

export default Index;
