import React, { Component } from 'react';
import { connect } from 'react-redux';



const mapStateToProps = (state, ownProps) => {
  const searchedCategory = ownProps.match.params.categoryName
  const category = state.categories.list.find(category => category.name === searchedCategory)
  return {
    searchedCategory: searchedCategory,
    category: category || false,
    categoryLoading: state.categories.categoryStatus.loading,
    posts: state.posts.list.filter(post => post.category === searchedCategory)
  }
}
