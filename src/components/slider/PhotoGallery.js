import { Component, Fragment } from "react";

export default class PhotoGallery extends Component {
  render() {
    return (
      <Fragment>
        {!this.props.noHeader && (
          <div className="container mx-auto">
            <div className="gallery-header mb-9">
              <div className="flex justify-center">
                <div className="text-center px-12">
                  <span className="block text-[#ef8201] mb-4 text-2xl font-bold">
                    Photo Gallery
                  </span>
                  <h2 className="text-4xl font-extrabold">
                    Inside Photo Gallery
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full width row with 4 equal rounded images */}
        <div className="flex flex-wrap gap-4 justify-center px-4 py-5">
          <img
            src="/gallery/1.png"
            alt="Gallery"
            className="w-1/5 rounded-lg object-cover"
          />
          <img
            src="/gallery/2.png"
            alt="Gallery"
            className="w-1/5 rounded-lg object-cover"
          />
          <img
            src="/gallery/3.png"
            alt="Gallery"
            className="w-1/5 rounded-lg object-cover"
          />
          <img
            src="/gallery/4.png"
            alt="Gallery"
            className="w-1/5 rounded-lg object-cover"
          />
        </div>
      </Fragment>
    );
  }
}
