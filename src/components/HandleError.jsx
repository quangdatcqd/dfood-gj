import React, { Component } from 'react';

class HandleError extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Xử lý lỗi ở đây
        return { hasError: true };
    }

    // componentDidCatch(error, errorInfo) {
    //     // Xử lý lỗi ở đây
    //     localStorage.clear();
    // }
    handleClear() {
        localStorage.removeItem("merchantLoc")
        localStorage.removeItem("customerLoc")
        localStorage.removeItem("merchantData")
        localStorage.removeItem("userInfo")
        window.location.reload();
    }
    render() {

        if (this.state.hasError) {
            // Hiển thị giao diện thay thế khi lỗi xảy ra 
            return <div
            >
                Có lỗi
                <button onClick={this.handleClear()}>reset</button>
            </div>
        }

        // Nếu không có lỗi xảy ra, hiển thị các component con
        return this.props.children;
    }
}

export default HandleError;