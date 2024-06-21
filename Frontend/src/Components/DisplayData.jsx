import React from "react";

function DisplayData({ data, handleDelete, updateData }) {
  return (
    <div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.profile && (
                    <img
                      src={`http://localhost:8080/uploads/${item.profile}`}
                      alt="image"
                      style={{ width: "80px", height: "80px" }}
                    />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    style={{
                      background: "red",
                      minWidth: "80px",
                      padding: "8px",
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="Updatebtn"
                    style={{
                      background: "#67B7EF",
                      minWidth: "80px",
                      padding: "8px",
                    }}
                    onClick={() => updateData(index, item)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>List is empty</h1>
      )}
    </div>
  );
}

export default DisplayData;
