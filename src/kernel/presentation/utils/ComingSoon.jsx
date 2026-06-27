import React, {Component} from 'react';

class ComingSoon extends Component {
    render() {
        const {isActive, classValue} = this.props;

        return (
            <div>
                <span
                    className={`text-[7px] font-semibold absolute z-50 ${classValue ? classValue : ''} px-2 py-1 bg-orange-300  opacity-100 rounded-full ${isActive ? '' : 'hidden'}`}>Coming Soon</span>
            </div>
        );
    }
}

export default ComingSoon;
